const constructListWithDateProp = <L, K extends keyof L>(list: L[], key: K) => {
  return list.map(item => {
    const x = item[key];
    return {
      ...item,
      [key]: typeof x === 'string' ? new Date(x) : '',
    };
  });
};

const sortByStart = (startA: { start?: string }, startB: { start?: string }) => {
  if (startA.start && startB.start) {
    return Number(startA.start) - Number(startB.start);
  }
  return 1;
};

const sortByStartDesc = (startA: { start?: string }, startB: { start?: string }) => {
  if (startA.start && startB.start) {
    return Number(startB.start) - Number(startA.start);
  }
  return -1;
};

const sortByCreatedAt = (
  { createdAt: createdAtA }: { createdAt: number; createdAtA: number },
  { createdAt: createdAtB }: { createdAt: number; createdAtB: number },
) => {
  return createdAtA - createdAtB;
};

const sortByCreatedAtDesc = (createdAtA: { createdAt?: string }, createdAtB: { createdAt?: string }) => {
  if (createdAtA.createdAt && createdAtB.createdAt) {
    return Number(createdAtB.createdAt) - Number(createdAtA.createdAt);
  }
  return -1;
};

const uniqueValues = (values: unknown[]) => {
  const uniqueValuesList = new Set(values);
  return [...uniqueValuesList];
};

export { sortByStart, sortByStartDesc, sortByCreatedAt, sortByCreatedAtDesc, constructListWithDateProp, uniqueValues };
