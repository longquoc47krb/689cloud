import { Button } from "antd";
import Header from "./components/Header";
import { AccountSettings, DetailContent } from "./components/Modal";
import logo from "../src/assets/images.png";
import Pagination from "./components/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListView, TileView } from "./components/ViewMode";
import Content from "./pages";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  return (
    <div className='bg-[#E2E2E2] h-[625px] w-[1366px]'>
      <Header />
      <div className='mt-3 ml-3'>
        <Content data={data} currentPage={currentPage} viewMode='tile' />
      </div>
    </div>
  );
}
export default App;
