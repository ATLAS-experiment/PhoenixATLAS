export const getUrlOptions = () => {
  return new URLSearchParams(window.location.href.substr(window.location.href.lastIndexOf('?')));
};
