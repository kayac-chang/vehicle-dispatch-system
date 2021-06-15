import { prop } from "ramda";
import { Discount, OrderDetail } from "types";
import { BaseResponse, get, KHH_API, post, Token } from "./base";

interface Address {
  county: string;
  district: string;
  street: string;
}

interface CaseUser {
  id: string;
  organizationIDs: string[];
  address: Address;
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

export function addOrder({
  token,
  caseID,
  userID,
  identity,
  organizations,
  from,
  to,
  note,
  isRoundTrip,
  share,
  carCategory,
  wheelchair,
  accompanying,
  phone,
  date,
}: Token & OrderDetail) {
  return post(
    KHH_API("OrderOfCaseUsers/Add"),
    {
      userId: userID,
      caseUserId: caseID,
      createdIdentity: identity,
      orgId: "",
      reserveDate: date.toISOString(),
      transOrgs: organizations,
      fromAddr: from.address,
      fromAddrRemark: from.note,
      toAddr: to.address,
      toAddrRemark: to.note,
      remark: note,
      isBack: Boolean(isRoundTrip),
      canShared: Boolean(share),
      carCategoryId: carCategory.id,
      carCategoryName: carCategory.name,
      wheelchairType: wheelchair,
      familyWith: Number(accompanying),
      noticePhone: phone,
    },
    {
      "X-Token": token,
    }
  ).then(() => true);
}
