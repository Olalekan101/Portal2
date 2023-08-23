export const GetLocalStorage = (params) => {
  const value = JSON.parse(localStorage.getItem(params || "user"));
  return value;
};
