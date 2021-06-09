import { prop } from "ramda";
import { KHH_API, post } from "./base";

interface BaseResponse {
  code: 200;
}

interface LoginResponse extends BaseResponse {
  token: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

/**
 * [POST /api/Check/Login]
 *
 * login with username and password
 */
export function login({ username, password }: LoginRequest): Promise<string> {
  return post<LoginResponse>(KHH_API("Check/Login"), {
    account: username,
    password: password,
    appKey: process.env.API_KEY,
    mobileDevice: "",
    pushKey: "",
  }).then(prop("token"));
}
