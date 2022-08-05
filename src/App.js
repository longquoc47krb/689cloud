import { Switch, Empty } from "antd";
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
import postServices from "./services/postServices";
function App() {
  const [data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState([]);
  const [accountModalShow, setAccountModalShow] = useState(false);
  const [totalItems, setTotalItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("list");
  const [filterType, setFilterType] = useState({});
  const [keyword, setKeyword] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [filterPage, setFilterPage] = useState({
    _limit: 4,
    _page: 1
  })
  const { _limit, _page } = filterPage;
  const handleSwitchViewMode = (switchValue) => {
    setViewMode(switchValue ? "list" : "tile");
    if (viewMode === "list") {
      setFilterPage({
        ...filterPage,
        _limit: 8
      })
    }
    else {
      setFilterPage({
        ...filterPage,
        _limit: 4
      })
    }
    console.log('filterPage', filterPage)

  }
  // total item for pagination 
  useEffect(() => {
    const fetchTotalItems = async () => {
      const res = await postServices.getAll();
      setPaginationData(res)
    };
    fetchTotalItems();
  }, []);
  useEffect(() => {
    const fetchAllItems = async () => {
      let res;
      if (filterType.length < 0) {
        res = await postServices.getAll();
      }
      else {
        res = await postServices.getByFilter(filterPage, filterType)
      }
      setData(res);
    };
    fetchAllItems();
    console.log('filterPage', filterPage);
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
  const onSelectGenre = (value) => {
    setFilterType({
      ...filterType,
      genre: value
    })
    setFilterPage({
      ...filterPage,
      _page: 1
    })
    console.log("filter onSelectGenre", filterType);
  }
  const onSelectGroup = (value) => {
    setFilterType({
      ...filterType,
      group: value
    })
    console.log("filter onSelectGroup", filterType);
  }
  function showDetailSearch(dropdown) {
    if (dropdown) return (<div className="flex justify-center mb-5 rotateMenuDown">
      <DetailSearch onSelectGroup={onSelectGroup} onSelectGenre={onSelectGenre} />
    </div>)
    return;
  }
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === '{}';

  }
  console.log(isEmptyObject, isEmptyObject(filterType));
  return (
    <div className='bg-[#E2E2E2] laptop:h-[100vh] mobile:h-[200vh] laptop:max-h-[500vw] max-w-[500vw] w-full'>
      <Header onShowAccountSettings={() => setAccountModalShow(true)} />

      <div className="flex justify-center my-5">
        <div className="relative">
          <Search
            dataSource={totalItems}
            onSelect={suggestionSelected}
            onChange={onTextChange}
            onPressEnter={handlePressEnter} />
          <Switch
            className="bg-[#72D498] absolute top-10 right-3"
            checkedChildren={<AiOutlineUnorderedList />}
            checked={viewMode === "list"}
            unCheckedChildren={<SiTile />}
            defaultChecked
            onChange={handleSwitchViewMode}
          />
          <p className="text-sm font-bold flex items-center absolute left-0 top-10" onClick={handleShowDetailSearch}>Detail search {dropdown ? <AiFillCaretDown /> : <AiFillCaretUp />}</p>
        </div>
      </div>
      <div className="w-[650px] flex justify-start mx-auto mb-5 relative"></div>
      {showDetailSearch(dropdown)}
      <div className="flex justify-center mb-5">
        <Pagination total={!isEmptyObject(filterType) ? data.length : paginationData.length} currentPage={1} onChangePage={onPageChange} pageSize={filterPage._limit} />
      </div>
      <div className='flex justify-center'>
        <Content data={data} currentPage={currentPage} viewMode={viewMode} />
      </div>
      {data.length === 0 && <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 100,
          margin: "0 auto",
          display: "inline-block"
        }} />}
      <AccountSettings visible={accountModalShow} onCancel={() => setAccountModalShow(false)} />
    </div>
  );
}
export default App;
