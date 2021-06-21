import { prop } from "ramda";
import { Discount, CaseUser } from "types";
import { BaseResponse, get, KHH_API, Token } from "./base";

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
  statusReason: string | null;
  reviewDate: string;
  wealTypeId: string;
  wealTypeName: string;
  isEffectNow: boolean;
}

function toCaseUser(data: CaseUserResponse): CaseUser {
  return {
    id: data.id,
    organizationIDs: [data.orgBId1, data.orgBId2, data.orgBId3].filter(Boolean),
    address: {
      county: data.county,
      district: data.district,
      street: data.addr,
    },
    urgent: {
      name: data.urgentName,
      relationship: data.urgentRelationship,
      phone: data.urgentPhone,
      tel: data.urgentTel,
    },
  };
}

type GetCaseUserResponse = BaseResponse & { result: CaseUserResponse };
export function getCaseUser({ token, caseID }: Token & { caseID: string }) {
  return get<GetCaseUserResponse>(KHH_API("CaseUsers/Get", { id: caseID }), {
    "X-Token": token,
  })
    .then(prop("result"))
    .then(toCaseUser);
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

function toDiscount({
  caseUserId,
  useDiscount,
  lastDiscount,
  totalDiscount,
}: DiscountDataResponse): Discount {
  return {
    caseID: caseUserId,
    used: useDiscount,
    remain: lastDiscount,
    total: totalDiscount,
  };
}

/**
 * [GET /api/CaseUserDiscounts/GetDiscountData]
 *
 * get Discount Data by caseuserId from service
 */
export function getDiscount({ caseID, token }: Token & { caseID: string }) {
  return get<GetUserResponse>(
    KHH_API("CaseUserDiscounts/GetDiscountData", { caseuserId: caseID }),
    {
      "X-Token": token,
    }
  )
    .then(prop("result"))
    .then(toDiscount);
}
