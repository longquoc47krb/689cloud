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
const constants = {
  searchFields,
  operation,
};
export default constants;
