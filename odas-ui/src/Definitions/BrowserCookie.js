import Cookies from "universal-cookie";

export const cookie = new Cookies();
export const authToken = cookie.get('auth');
export const invCode = cookie.get('invCode');
export const orgName = cookie.get('org');
export const userName = cookie.get('username');
