import { Switch } from "antd";
import axios from "axios";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import queryString from 'query-string';
import { useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { SiTile } from "react-icons/si";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Content from "./components/Content";
import { DetailContent, AccountSettings } from "./components/Modal";
import Search from "./components/Search";
import DetailSearch from "./components/DetailSearch";
function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState({})
  const [totalItems, setTotalItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("list");
  const [filterType, setFilterType] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [filterPage, setFilterPage] = useState({
    _limit: 8,
    _page: 1
  })
  const { _limit, _page } = filterPage;
  const handleSwitchViewMode = (switchValue) => {
    setViewMode(switchValue ? "list" : "tile");
    console.log("viewMode", viewMode);
  }
  // total item for pagination 
  useEffect(() => {
    const fetchTotalItems = async () => {
      const res = await axios.get('http://localhost:8000/posts');
      setTotalItems(res.data);
      console.log('totalItems', totalItems)
    };
    fetchTotalItems();
  }, []);
  useEffect(() => {
    const fetchAllItem = async () => {
      let res = null;
      const parameterPage = queryString.stringify(filterPage)
      const parameterType = filterType?.map((item) => {
        return queryString.stringify(item)
      }).join('&');

      if (filterType.length < 0) {
        res = await axios.get('http://localhost:8000/posts');
      } else {
        res = await axios.get(`http://localhost:8000/posts?${parameterType}&${parameterPage}`);
      }
      console.log(`http://localhost:8000/posts?${parameterPage}`)
      setData(res.data);

    };
    fetchAllItem();

  }, [filterPage, filterType]);
  const onPageChange = (e) => {
    setFilterPage({
      ...filterPage,
      _page: e
    })
  }
  // handle searchBar
  const onTextChange = (value) => {
    if (value === "") {
      setFilterType(null);
      console.log("filter when input clear", filterType);
    }
    setKeyword(value);
  };

  const suggestionSelected = (value) => {
    setKeyword(value);
    console.log("value when selected", value);
    setFilterType({
      ...filterType,
      title: value
    });
    console.log("filter selected", filterType);
  };
  const handlePressEnter = (value) => {
    console.log("handlePressEnter", value);
    setFilterType({
      ...filterType,
      title: keyword
    })
  };
  const handleShowDetailSearch = () => {
    setDropdown(!dropdown);
  }
  return (
    <div className='bg-[#E2E2E2] h-full w-full min-h-screen'>
      <Header />

      <div className="flex justify-center my-5 relative">
        <Search
          dataSource={totalItems}
          onSelect={suggestionSelected}
          onChange={onTextChange}
          onPressEnter={handlePressEnter} />
        <Switch
          className="bg-[#72D498] absolute top-[47px] right-[500px]"
          checkedChildren={<AiOutlineUnorderedList />}
          checked={viewMode === "list"}
          unCheckedChildren={<SiTile />}
          defaultChecked
          onChange={handleSwitchViewMode}
        />
      </div>
      <div className="w-[650px] flex justify-start mx-auto mb-5"><p className="text-sm font-bold flex items-center " onClick={handleShowDetailSearch}>Detail search {dropdown ? <AiFillCaretDown /> : <AiFillCaretUp />}</p></div>
      {dropdown && <div className="flex justify-center mb-5">
        <DetailSearch />
      </div>}
      <div className="flex justify-center mb-5">
        <Pagination total={totalItems.length} currentPage={1} onChangePage={onPageChange} />
      </div>
      <div className='flex justify-center'>
        <Content data={data} currentPage={currentPage} viewMode={viewMode} />
      </div>
      <DetailContent visible={modalOpen} selected={selected} />

    </div>
  );
}
export default App;
