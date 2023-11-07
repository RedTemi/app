function isEmptyObject(o) {
  return Object.entries(o).length === 0 && o.constructor === Object;
}

export default isEmptyObject;
