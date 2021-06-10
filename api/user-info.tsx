import { get, KHH_API, post } from "./base";
import { parse, format } from "date-fns";
import { pipe, prop } from "ramda";
import { CaseUserInfo, DiscountData } from "types/user-info";

const formatOnlyDate = pipe(
  (value: string) => parse(value, "yyyy-MM-dd HH:mm:ss", new Date()),
  (date) => format(date, "yyyy-MM-dd")
);

interface BaseResponse {
  code: number;
}

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

/**
 * [GET /api/CaseUsers/Get]
 *
 * get CaseUsers info by id from service
 */
export function getGeoCode(id: string): Promise<CaseUserInfo | undefined> {
  return get<GetCaseUserResponse>(KHH_API("/api/CaseUsers/Get", { id })).then(
    pipe(prop("result"), toCaseUser)
  );
}

interface DiscountDataResponse {
  caseUserId: string;
  useDiscount: number;
  lastDiscount: number;
  totalDiscount: number;
}

interface GetUserResponse extends BaseResponse {
  result: DiscountDataResponse;
}

function toDiscountData({
  // caseUserId,
  useDiscount,
  lastDiscount,
  totalDiscount,
}: DiscountDataResponse): DiscountData {
  return {
    // caseUserId: caseUserId,
    useDiscount: useDiscount,
    lastDiscount: lastDiscount,
    totalDiscount: totalDiscount,
  };
}

/**
 * [GET /api/CaseUserDiscounts/GetDiscountData]
 *
 * get Discount Data by caseuserId from service
 */
export function getDiscountData(
  caseuserId: string
): Promise<DiscountData | undefined> {
  return get<GetUserResponse>(
    KHH_API("/api/CaseUserDiscounts/GetDiscountData", { caseuserId })
  ).then(pipe(prop("result"), toDiscountData));
}
