import { get, KHH_API, Token, BaseResponse } from "./base";
import { parse, format } from "date-fns";
import { pipe, prop } from "ramda";
import { CaseUserInfo } from "types";

const formatOnlyDate = (value: string) => {
  if (!value) return "";
  const date = parse(value, "yyyy-MM-dd HH:mm:ss", new Date());
  return format(date, "yyyy-MM-dd");
};

interface CaseUserResponse {
  id: string;
  userId: string;
  caseUserId: string;
  caseUserNo: string;
  orgAId: string;
  orgBId1: string;
  orgBId2: string;
  orgBId3: string;
  uid: string;
  otherPhone: string;
  birthday: string;
  disabilityLevel: number;
  county: string;
  district: string;
  addr: string;
  lat: number;
  lon: number;
  urgentName: string;
  urgentRelationship: string;
  urgentPhone: string;
  urgentTel: string;
  startDate: string;
  expiredDate: string;
  remark: string;
  caseUserStatus: number;
  statusReason: string;
  reviewDate: string;
  wealTypeId: string;
  wealTypeName: string;
  isEffectNow: boolean;
}

interface GetCaseUserResponse extends BaseResponse {
  result: CaseUserResponse;
}

function toCaseUser({
  id,
  userId,
  caseUserId,
  caseUserNo,
  orgAId,
  orgBId1,
  orgBId2,
  orgBId3,
  uid,
  otherPhone,
  birthday,
  disabilityLevel,
  county,
  district,
  addr,
  lat,
  lon,
  urgentName,
  urgentRelationship,
  urgentPhone,
  urgentTel,
  startDate,
  expiredDate,
  remark,
  caseUserStatus,
  statusReason,
  reviewDate,
  wealTypeId,
  wealTypeName,
  isEffectNow,
}: CaseUserResponse): CaseUserInfo {
  return {
    id: id,
    userId: userId,
    caseUserId: caseUserId,
    caseUserNo: caseUserNo,
    orgAId: orgAId,
    orgBId1: orgBId1,
    orgBId2: orgBId2,
    orgBId3: orgBId3,
    uid: uid,
    otherPhone: otherPhone,
    birthday: formatOnlyDate(birthday),
    disabilityLevel: disabilityLevel,
    county: county,
    district: district,
    addr: addr,
    lat: lat,
    lon: lon,
    urgentName: urgentName,
    urgentRelationship: urgentRelationship,
    urgentPhone: urgentPhone,
    urgentTel: urgentTel,
    startDate: formatOnlyDate(startDate),
    expiredDate: formatOnlyDate(expiredDate),
    remark: remark,
    caseUserStatus: caseUserStatus,
    statusReason: statusReason,
    reviewDate: formatOnlyDate(reviewDate),
    wealTypeId: wealTypeId,
    wealTypeName: wealTypeName,
    isEffectNow: isEffectNow,
  };
}

interface CaseUserRequest {
  id: string | undefined;
}

/**
 * [GET /api/CaseUsers/Get]
 *
 * get CaseUsers info by caseId from service
 */
export function getCaseUsers({
  id,
  token,
}: CaseUserRequest & Token): Promise<CaseUserInfo | undefined> {
  // TODO refactor to caseuser

  return get<GetCaseUserResponse>(KHH_API("CaseUsers/Get", { id }), {
    "X-Token": token,
  }).then(pipe(prop("result"), toCaseUser));
}
