const searchRe = /(_[a-z])/g;

const replacer = (match: string) => {
  return match.substring(1).toUpperCase();
};

const camelize = (str: string) => {
  return str.replace(searchRe, replacer);
};

export default camelize;
