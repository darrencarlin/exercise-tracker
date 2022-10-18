export const setLocalItem = (key: string, value: any) => {
  const item = JSON.stringify(value);
  localStorage.setItem(key, item);
};

export const getLocalItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeLocalItem = (key: string) => {
  localStorage.removeItem(key);
};
