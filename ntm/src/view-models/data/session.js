export const setItem = ([ key , value ]) => window.sessionStorage.setItem(key, JSON.stringify(value));
export const getItem = key => JSON.parse(window.sessionStorage.getItem(key));
export const invalidate = () => {
  window.sessionStorage.clear();
  window.location.reload();
}
