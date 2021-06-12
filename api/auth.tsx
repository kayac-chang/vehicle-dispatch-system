import { prop } from "ramda";
import { KHH_API, post, get } from "./base";

interface BaseResponse {
  code: 200;
}

interface Token {
  token: string;
}

interface Request {
  username: string;
  password: string;
}

type LoginResponse = BaseResponse & Token;

/**
 * [POST /api/Check/Login]
 *
 * login with username and password
 */
export function login({ username, password }: Request): Promise<string> {
  return post<LoginResponse>(KHH_API("Check/Login"), {
    account: username,
    password: password,
    appKey: process.env.API_KEY,
    mobileDevice: "",
    pushKey: "",
  }).then(prop("token"));
}

/**
 * [POST /api/Check/Logout]
 *
 * logout with token
 */
export function logout({ token }: Token) {
  return post(
    KHH_API("Check/Logout"),
    {},
    {
      "X-Token": token,
    }
  ).then(() => true);
}

/**
 * [POST /api/Users/ChangePassword]
 *
 * change user password
 */
export function changePassword({ username, password, token }: Request & Token) {
  return post(
    KHH_API("Users/ChangePassword"),
    {
      account: username,
      password: password,
      isSelf: true,
    },
    {
      "X-Token": token,
    }
  ).then((e) => {
    if (e.code === 200) return true;
    return e;
  });
}

type UsernameResponse = BaseResponse & { result: string };

/**
 * [GET /api/Check/GetUserName]
 *
 * get username(UID) by token
 */
export function getUsername({ token }: Token): Promise<string> {
  return get<UsernameResponse>(KHH_API("Check/GetUserName"), {
    "X-Token": token,
  }).then(({ result }) => result);
}
