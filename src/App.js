import { Button } from "antd";
import Header from "./components/Header";
import { AccountSettings, DetailContent } from "./components/Modal";
import logo from "../src/assets/images.png";
import Pagination from "./components/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListView, TileView } from "./components/ViewMode";
import Content from "./pages";
import { Switch } from "antd";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { SiTile } from "react-icons/si";
function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("list");
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      setData(res.data);
    };
    fetchData();
  }, []);
  const onPageChanged = (page) => {};
  const onChangeViewMode = () => {};
  return (
    <div className='bg-[#E2E2E2] h-[625px] w-[1366px]'>
      <Header />
      <Switch
        style={{ color: "black" }}
        checkedChildren={<AiOutlineUnorderedList />}
        checked={viewMode === "list"}
        unCheckedChildren={<SiTile />}
        defaultChecked
        onChange={(switchValue) => {
          setViewMode(switchValue ? "list" : "tile");
          console.log("viewMode", viewMode);
        }}
      />
      <div className='mt-3 ml-3'>
        <Content data={data} currentPage={currentPage} viewMode={viewMode} />
      </div>
    </div>
  );
}
export default App;
