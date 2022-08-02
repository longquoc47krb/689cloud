import React from "react";
import {
  Pagination as MuiPagination,
  PaginationItem as MuiPaginationItem,
  Stack,
} from "@mui/material";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

/*
 * @param { number } pageCount Number of pages
 * @param { number } currentPage Number of current page
 * @param { function } onChangePage Using when change page
 */
const Pagination = ({ data, currentPage, onPageChanged }) => {
  const PAGE_SIZE = 4;
  let pagesCount = Math.ceil(data / PAGE_SIZE);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <Stack spacing={2}>
      <MuiPagination
        count={pagesCount}
        page={currentPage}
        onChange={(e) => {
          // console.log(e.currentTarget.textContent)
          onPageChanged(Number(e.currentTarget.textContent));
        }}
        renderItem={(item) => (
          <MuiPaginationItem
            components={{
              previous: AiOutlineArrowLeft,
              next: AiOutlineArrowRight,
            }}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default Pagination;
