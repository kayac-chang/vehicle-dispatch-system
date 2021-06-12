import { get, KHH_API, post } from "./base";
import { pipe, prop } from "ramda";
import { ChangePasswordRequest, UnPermissionUserType, User } from "types/user";
import { mockUsersGet } from "./mockData";

interface BaseResponse {
  code: 200;
}

interface Token {
  token: string;
}

interface GetUnPermissionUserTypeResponse extends BaseResponse {
  data: UnPermissionUserType[];
}

function toUnPermissionUserType(
  data: UnPermissionUserType[]
): UnPermissionUserType[] {
  return data;
}

interface UnPermissionUserRequest {
  userId: string;
  UID: string;
}

/**
 * [GET /api/Users/GetUnPermissionUserType]
 *
 * get User info by userId and UID from service
 */
export function getUnPermissionUserType({
  userId,
  UID,
  token,
}: UnPermissionUserRequest & Token): Promise<
  UnPermissionUserType[] | undefined
> {
  return get<GetUnPermissionUserTypeResponse>(
    KHH_API("Users/GetUnPermissionUserType", { userId, UID }),
    {
      "X-Token": token,
    }
  ).then((res) => {
    return toUnPermissionUserType(res.data);
  });
}

interface UserResponse {
  id: string;
  account: string;
  name: string;
  uid: string;
  sex: number;
  phone: string;
  status: number;
  type: number;
  unLockDate: string | null;
  createDate: string;
  createUserId: string;
  createUserName: string;
  modifyDate: string;
  modifyUserId: string;
  modifyUserName: string;
  organizations: string;
  organizationIds: string;
}

interface GetUserResponse extends BaseResponse {
  result: UserResponse;
}

function toUser({ id, account, name, uid, sex, phone }: UserResponse): User {
  return {
    id: id,
    account: account,
    name: name,
    uid: uid,
    gender: sex == 1 ? "male" : "female",
    phone: phone,
  };
}

interface UserRequest {
  id: string | undefined;
}

/**
 * [GET /api/Users/Get]
 *
 * get CaseUsers info by caseId from service
 */
export function getUser({
  id,
  token,
}: UserRequest & Token): Promise<User | undefined> {
  return get<GetUserResponse>(KHH_API("Users/Get", { id }), {
    "X-Token": token,
  }).then(pipe(prop("result"), toUser));
}

function toChangePassword({ code }: BaseResponse): BaseResponse {
  return {
    code: code,
  };
}

/**
 * [POST /api/Users/ClientChangePassword]
 *
 * client change password
 */
export function postChangePassword(
  payload: ChangePasswordRequest
): Promise<BaseResponse | undefined> {
  return post<GetUserResponse>(
    KHH_API("Users/ClientChangePassword").url,
    payload
  ).then(pipe(toChangePassword));
}

interface UpdateUserPhoneRequest {
  id: string;
  phone: string;
}

/**
 * [POST /api/Users/UpdateUserPhone]
 *
 * change user password
 */
export function updateUserPhone({
  id,
  phone,
  token,
}: UpdateUserPhoneRequest & Token) {
  return post(
    KHH_API("Users/UpdateUserPhone"),
    {
      id: id,
      phone: phone,
    },
    {
      "X-Token": token,
    }
  ).then(() => true);
}
