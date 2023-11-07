function dateStrToDateObject(list, key = 'start') {
  return list.map((item) => ({
    ...item,
    [key]: new Date(item[key]),
  }));
}

function sortByStart({ start: startA }, { start: startB }) {
  return startA - startB;
}

function sortByStartDesc({ start: startA }, { start: startB }) {
  return startB - startA;
}

function sortByCreatedAt({ createdAt: createdAtA }, { createdAt: createdAtB }) {
  return createdAtA - createdAtB;
}

function sortByCreatedAtDesc({ createdAt: createdAtA }, { createdAt: createdAtB }) {
  return createdAtB - createdAtA;
}

function uniqueValues(values) {
  return values.filter((value, index, self) => self.indexOf(value) === index);
}

export {
  sortByStart,
  sortByStartDesc,
  sortByCreatedAt,
  sortByCreatedAtDesc,
  dateStrToDateObject,
  uniqueValues,
};
