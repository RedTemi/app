const separator = '\n';

const titleAndBody = (str: string) => {
  const parts = str.split(separator);

  if (parts.length === 1) {
    return ['', str.trim()];
  }

  const title = parts.shift()?.trim();
  const body = parts.join(separator).trim();

  return [title, body];
};

export default titleAndBody;
