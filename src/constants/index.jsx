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
  { key: "SEARCH_BY_AUTHOR", content: "Search by author" },
  { key: "SEARCH_BY_TITLE", content: "Search by title" },
  { key: "FILTER_BY_DATE_RANGE", content: "Filter by date range" },
  { key: "FILTER_BY_GROUP", content: "Filter by group " },
];
const searchBoxItems2 = [
  {
    key: "SEARCH_BY_PARAM_1",
    content: "Search by param_1",
    value: 12,
  },
  {
    key: "FILTER_BY_GENRE",
    content: "Filter by genre",
    value: 10,
  },

  {
    key: "FILTER_BY_PARAM_2",
    content: "Filter by parameter_2",
    value: 8,
  },
];
const options = [
  { value: 5, text: "5" },
  { value: 10, text: "10" },
  { value: 20, text: "20" },
  { value: 50, text: "50" },
  { value: 100, text: "100" },
];
const constants = {
  searchFields,
  operation,
  searchBoxItems,
  searchBoxItems2,
  options,
};
export default constants;
