function trimster([key, value]) {
  const valueHandled = (typeof value === 'string') ? value.trim() : value;
  return [key, valueHandled];
}

function trimObject(obj) {
  return Object.fromEntries(Object.entries(obj).map(trimster));
}

export default trimObject;
