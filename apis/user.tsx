import { get, KHH_API, post, BaseResponse, Token } from "./base";
import { pipe, prop } from "ramda";
import { UnPermissionUserType, User } from "types";

interface GetUnPermissionUserTypeResponse extends BaseResponse {
  data: UnPermissionUserType[];
}

export async function getCaseID({ id, uid, token }: User & Token) {
  return get<GetUnPermissionUserTypeResponse>(
    KHH_API("Users/GetUnPermissionUserType", { userId: id, UID: uid }),
    {
      "X-Token": token,
    }
  )
    .then(prop("data"))
    .then((data) =>
      data.filter(
        ({ caseId, userType, isEnable }) =>
          caseId && isEnable && userType === "caseuser"
      )
    )
    .then((data) => data[0])
    .then(prop("caseId"));
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
    gender: sex === 1 ? "male" : "female",
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

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * [POST /api/Users/ClientChangePassword]
 *
 * client change password
 */
export function postChangePassword(payload: ChangePasswordRequest) {
  return post<GetUserResponse>(
    KHH_API("Users/ClientChangePassword"),
    payload
  ).then(() => true);
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
