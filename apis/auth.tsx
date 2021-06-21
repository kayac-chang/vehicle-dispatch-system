import { prop } from "ramda";
import { User } from "types";
import { Token, KHH_API, post, get, BaseResponse } from "./base";

interface Request {
  username: string;
  password: string;
}

type LoginResponse = BaseResponse & Token & { result: string };

/**
 * [POST /api/Check/Login]
 *
 * login with username and password
 */
export function login({
  username,
  password,
}: Request): Promise<{ token: string; first: boolean }> {
  return post<LoginResponse>(KHH_API("Check/Login"), {
    account: username,
    password: password,
    appKey: process.env.API_KEY,
  }).then(({ token, result }) => ({
    token,
    first: Boolean(result),
  }));
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
  ).then(() => true);
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

interface UserProfileResponse {
  id: string;
  account: string;
  name: string;
  uid: string;
  sex: 0 | 1;
  phone: string;
  status: number;
  type: number;
  unLockDate: string | null;
  createDate: string | null;
  createUserId: string;
  createUserName: string;
  modifyDate: string;
  modifyUserId: string;
  modifyUserName: string;
  organizations: string;
  organizationIds: string;
}

function toUser(data: UserProfileResponse): User {
  return {
    id: data.id,
    account: data.account,
    name: data.name,
    uid: data.uid,
    gender: data.sex === 1 ? "male" : "female",
    phone: data.phone,
  };
}

type GetUserProfileResponse = BaseResponse & { result: UserProfileResponse };
/**
 * [GET /api/Check/GetUserProfile]
 *
 * get user profile by token
 */
export function getUserProfile({ token }: Token) {
  return get<GetUserProfileResponse>(KHH_API("Check/GetUserProfile"), {
    "X-Token": token,
  })
    .then(prop("result"))
    .then(toUser);
}

interface GetVerificationRequest {
  username: string;
}

interface GetVerificationResponse extends BaseResponse {
  result: string;
}

/**
 * [GET /api/Users/AddClientVerification]
 *
 * get verification with username
 */
export function getVerification({ username }: GetVerificationRequest) {
  return get<GetVerificationResponse>(
    KHH_API("Users/AddClientVerification", { UserAcc: username })
  ).then(prop("result"));
}

interface CheckVerificationRequest {
  username: string;
  verificationCode: string;
}

/**
 * [GET /api/Users/CheckMobileVerification]
 *
 * check verification with username and verificationCode
 */
export function checkVerification({
  username,
  verificationCode,
}: CheckVerificationRequest) {
  return get(
    KHH_API("Users/CheckMobileVerification", {
      UserAcc: username,
      VerificationCode: verificationCode,
    })
  ).then(() => true);
}

/**
 * [GET /api/Check/GetStatus]
 *
 * check token status
 */
export function checkToken({ token }: Token) {
  return get(KHH_API("Check/GetStatus"), {
    "X-Token": token,
  }).then(() => true);
}
