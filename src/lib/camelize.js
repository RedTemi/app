const searchRe = /(_[a-z])/g;

function replacer(match) {
  return match.substring(1).toUpperCase();
}

function camelize(str) {
  return str.replace(searchRe, replacer);
}

export default camelize;
