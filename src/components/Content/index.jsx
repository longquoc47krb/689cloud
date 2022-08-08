import { useEffect, useState } from "react";
import { ListView, TileView } from "../ViewMode";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import Pagination from "../Pagination";
import { DetailContent } from "../Modal";

const Content = (props) => {
  const { data, viewMode } = props;
  const [selected, setSelected] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const renderByViewType = (viewMode, data) => {
    if (viewMode === 'list') {
      return (
        <div>
          {data.map((item, index) => (
            <ListView
              key={index}
              title={item.title}
              author={item.author}
              photo={item.image}
              description={item.description}
              onShowDetails={() => {
                setSelected(item);
                setModalOpen(true)
              }}
              onDisplayBook={() => console.log("item", item)}
            />
          ))}
        </div>
      )
    } else {
      return (
        <div className='grid laptop:grid-cols-4 mobile:grid-cols-2 tablet:grid-cols-3'>
          {data.map((item) => (
            <TileView
              key={item.id}
              title={item.title}
              author={item.author}
              photo={item.image}
              description={item.description}
              onShowDetails={() => {
                setSelected(item);
                setModalOpen(true)
              }}
              onDisplayBook={() => console.log("item", item)}
            />
          ))}
        </div>
      )
    }
  }
  return (
    <>
      {renderByViewType(viewMode, data)}
      <DetailContent visible={modalOpen} selectedItem={selected} onCancel={() => setModalOpen(false)} />
    </>
  );
};

export default Content;
