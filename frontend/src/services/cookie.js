import Cookies from "js-cookie";

const TOKEN = "token";

const setToken = (token) => {
  Cookies.set(TOKEN, token, { expires: 1 / 24, path: "/" });
};

const getToken = () => {
  const token = Cookies.get(TOKEN);
  if (!token) removeToken();
  return token;
};

const removeToken = () => {
  return Cookies.remove(TOKEN, { path: "/" });
};
const isAuth = () => {
  return !!getToken();
};
export { setToken, getToken, removeToken, isAuth };
