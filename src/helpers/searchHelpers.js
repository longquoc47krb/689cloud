/**
 * @param {String} firstWord
 * @param {String} secondWord
 */
const findCommonPrefix = (firstWord, secondWord) => {
  const minLength = Math.min(firstWord.length, secondWord.length);
  for (let i = 0; i < minLength; i++) {
    if (firstWord[i] !== secondWord[i]) {
      return i;
    }
  }
  return minLength;
};

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
const suggestedProducts = function (products, searchWord) {
  products.sort();

  const result = Array.from(Array(searchWord.length), () => []);
  for (let product of products) {
    const prefixLength = findCommonPrefix(product, searchWord);

    for (let i = 0; i < prefixLength; i++) {
      if (result[i].length < 3) {
        result[i].push(product);
      }
    }
  }

  return [].concat(...result);
};
export { suggestedProducts, findCommonPrefix };
