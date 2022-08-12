const searchFields = [
  {
    key: "TITLE",
    value: "Title",
  },
  {
    key: "AUTHOR",
    value: "Author",
  },
  {
    key: "KEYWORDS",
    value: "Keywords",
  },
  {
    key: "PUBLISHER",
    value: "Publisher",
  },
];

const operation = [
  {
    key: "PARTIAL_MATCH",
    value: "Partial Match",
  },
  {
    key: "MATCH_DATE_RANGE",
    value: "Match Date Range",
  },
  {
    key: "MATCH_MULTIPLE_CHOICE",
    value: "Match Multiple Choices",
  },
];
const searchBoxItems = [
  { key: "SEARCH_BY_AUTHOR", value: "Search by author" },
  { key: "SEARCH_BY_TITLE", value: "Search by title" },
  { key: "FILTER_BY_DATE_RANGE", value: "Filter by date range" },
  { key: "FILTER_BY_GROUP", value: "Filter by group " },
];
const constants = {
  searchFields,
  operation,
  searchBoxItems,
};
export default constants;
