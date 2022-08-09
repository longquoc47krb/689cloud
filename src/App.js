import Item from "./component/Item";
import { useEffect, useState } from "react";
import httpRequest from "./services/httpRequest";
import Carousel from "./component/Carousel";
import { Input, Typography } from "antd";
function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("Pet");
  const [keyword, setKeyword] = useState("");
  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };
  useEffect(() => {
    const fetchImages = async () => {
      const response = await httpRequest({
        url: "",
        method: "GET",
        params: {
          q: query,
        },
      });
      console.log(response);
      setData(response.hits);
    };
    fetchImages();
    console.log("data", data);
  }, [query]);
  return (
    <div className='bg-black w-full h-full'>
      <h1 className='flex justify-center font-semibold text-3xl'>
        Carousel example
      </h1>
      <Carousel className='py-10' data={data} />
    </div>
  );
}

export default App;
