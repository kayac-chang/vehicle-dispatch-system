import { get, KHH_API, post } from "./base";
import { pipe, prop } from "ramda";
import { ChangePasswordRequest, UnPermissionUserType, User } from "types/user";

interface BaseResponse {
  code: number;
}

interface UnPermissionUserTypeResponse {
  data: UnPermissionUserType[];
}

interface GetUnPermissionUserTypeResponse extends BaseResponse {
  data: UnPermissionUserTypeResponse;
}

function toUnPermissionUserType({
  data,
}: UnPermissionUserTypeResponse): UnPermissionUserType[] {
  return data;
}

/**
 * [GET /api/Users/GetUnPermissionUserType]
 *
 * get User info by userId and UID from service
 */
export function getUnPermissionUserType(
  userId: string,
  UID: string
): Promise<UnPermissionUserType[] | undefined> {
  return get<GetUnPermissionUserTypeResponse>(
    KHH_API("/api/Users/GetUnPermissionUserType", { userId, UID })
  ).then(pipe(prop("data"), toUnPermissionUserType));
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
  unLockDate: string;
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
    sex: sex,
    phone: phone,
  };
}

/**
 * [GET /api/Users/Get]
 *
 * get CaseUsers info by id from service
 */
export function getUser(id: string): Promise<User | undefined> {
  return get<GetUserResponse>(KHH_API("/api/Users/Get", { id })).then(
    pipe(prop("result"), toUser)
  );
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
    KHH_API("/api/Users/ClientChangePassword").url,
    payload
  ).then(pipe(toChangePassword));
}
