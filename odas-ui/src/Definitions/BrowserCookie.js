import Cookies from "universal-cookie";

export const cookie = new Cookies();
export const authToken = cookie.get('auth');
