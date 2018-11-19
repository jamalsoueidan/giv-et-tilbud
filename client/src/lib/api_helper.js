export const toParams = json => {
  const query = Object.entries(json)
    .filter(([key, value]) => {
      return value;
    })
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
  return "?" + query;
};
