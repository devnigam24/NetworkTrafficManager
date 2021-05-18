export const getResultsInChunks = (array, bathcSize) => {
  return array.map((element, index) => {
    return index % bathcSize === 0 ? array.slice(index, index + bathcSize) : null;
  }).filter(e => e);
};

export const removeFromArray = (array, removingItem) => {
  const index = array.indexOf(removingItem);
  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
}

export function compare(a, b) {
  const stringA = a.toUpperCase();
  const stringB = b.toUpperCase();

  let comparison = 0;
  if (stringA > stringB) {
    comparison = 1;
  } else if (stringA < stringB) {
    comparison = -1;
  }
  return comparison;
}
