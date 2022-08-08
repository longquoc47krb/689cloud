import { Empty, Switch } from "antd";
import { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineUnorderedList } from "react-icons/ai";
import { SiTile } from "react-icons/si";
import Content from "./components/Content";
import DetailSearch from "./components/DetailSearch";
import Header from "./components/Header";
import { AccountSettings } from "./components/Modal";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import httpRequest from "./services/api/httpRequest";
import queryString from 'query-string';
function App() {
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [accountModalShow, setAccountModalShow] = useState(false);
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

  }
  // total item for pagination 
  useEffect(() => {
    const fetchRawData = async () => {
      const res = await httpRequest({
        url: '/posts',
        method: 'GET'
      }) 
      setRawData(res)
    };
    fetchRawData();
  }, []);
  useEffect(() => {
    const fetchAllItems = async () => {
      const pageParams = queryString.stringify(filterPage)
      const filterParams = queryString.stringify(filterType, { skipNull: true, skipEmptyString: true })
      const res = await httpRequest({
        url: `/posts?${pageParams}&${filterParams}`,
        method: 'GET',
      })
      setData(res);
    };
    fetchAllItems();
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
    }
    setKeyword(value);

  };

  const suggestionSelected = (value) => {
    setKeyword(value);
    setFilterType({
      ...filterType,
      title: value
    });
  };
  const handlePressEnter = (value) => {
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
    if (viewMode === "list") {
      setFilterPage({
        _limit: 4,
        _page: 1
      })
    }
    else {
      setFilterPage({
        _limit: 8,
        _page: 1
      })
    }
    console.log('filter page', filterPage);
    console.log('filter type', filterType);


  }
  const onSelectGroup = (value) => {
    setFilterType({
      ...filterType,
      group: value
    })
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
  return (
    <div className='bg-[#E2E2E2] laptop:h-[100vh] mobile:h-[200vh] laptop:max-h-[500vw] max-w-[500vw] w-full'>
      <Header onShowAccountSettings={() => setAccountModalShow(true)} />

      <div className="flex justify-center my-5">
        <div className="relative">
          <Search
            dataSource={rawData}
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
        <Pagination total={!isEmptyObject(filterType) ? data.length : rawData.length} currentPage={1} onChangePage={onPageChange} pageSize={filterPage._limit} />
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
