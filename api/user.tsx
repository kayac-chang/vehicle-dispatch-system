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

interface UserRequest {
  caseId: string | undefined;
}

/**
 * [GET /api/Users/Get]
 *
 * get CaseUsers info by caseId from service
 */
export function getUser({
  caseId,
  token,
}: UserRequest & Token): Promise<User | undefined> {
  return get<GetUserResponse>(KHH_API("Users/Get", { caseId }), {
    "X-Token": token,
  }).then((res) => {
    //TODO: mock要拿掉
    if (res.result === null) return mockUsersGet.result;
    return toUser(res.result);
  });
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
