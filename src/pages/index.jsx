import React, { useState } from "react";
import Pagination from "../components/Pagination";
import { ListView, TileView } from "../components/ViewMode";

const Content = ({ data, currentPage, onPageChanged, ...props }) => {
  const { viewMode } = props;
  return (
    <div>
      <Pagination
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        data={data}
      />
      <div>
        {data.map((item) => {
          if (viewMode === "list") {
            return (
              <ListView
                key={item.id}
                title={item.userId}
                author={item.userId}
                description={item.title}
              />
            );
          } else {
            return (
              <TileView
                key={item.id}
                title={item.userId}
                author={item.userId}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Content;
