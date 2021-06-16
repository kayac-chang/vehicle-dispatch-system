import { format, parse } from "date-fns";
import { map, prop } from "ramda";
import {
  Record,
  OrderDetail,
  OrderDetailRecord,
  OrderAmount,
  Dispatch,
  OrderHistory,
} from "types";
import { BaseResponse, get, KHH_API, post, Token } from "./base";

interface OrderResponse {
  id: string;
  caseUserId: string;
  orgName: string | null;
  createdIdentity: string;
  createDate: string;
  userName: string;
  userUID: string;
  userPhone: string;
  orderNo: string;
  caseUserNo: string;
  reserveDate: string;
  status: number;
  fromAddr: string;
  fromAddrRemark: string | null;
  toAddr: string;
  toAddrRemark: string | null;
  fromLat: number;
  fromLon: number;
  toLat: number;
  toLon: number;
  carCategoryName: string;
  wheelchairType: string;
  familyWith: number;
  maidWith: number;
  noticePhone: string;
  canShared: boolean;
  etTotalAmt: number;
  etDiscountAmt: number;
  etSelfPay: number;
  etWithAmt: number;
  cancelRemark: string;
  wealTypeId: string;
  wealTypeName: string;
  expectedMinute: number;
  totalMileage: number;
  isBack: boolean;
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

export function deleteOrder({ token, id }: Token & Record) {
  return post(
    KHH_API("OrderOfCaseUsers/CancelOrder"),
    {
      id,
      cancelRemark: "SYS_ORDERCANCEL_REMARK_CLIENT",
    },
    {
      "X-Token": token,
    }
  ).then(() => true);
}

function toRecord(data: OrderResponse): OrderDetailRecord {
  return {
    id: data.id,
    order: data.orderNo,
    caseID: data.caseUserId,
    caseNo: data.caseUserNo,
    date: parse(data.reserveDate, "yyyy-MM-dd HH:mm:ss", new Date()),
    status: data.status,
    name: data.userName,
    userPhone: data.userPhone,
    from: {
      id: "",
      address: data.fromAddr,
      lat: data.fromLat,
      lon: data.fromLon,
      note: data.fromAddrRemark || undefined,
    },
    to: {
      id: "",
      address: data.toAddr,
      lat: data.toLat,
      lon: data.toLon,
      note: data.toAddrRemark || undefined,
    },
    accompanying: data.familyWith,
    userID: data.userUID,
    identity: data.createdIdentity,
    organizations: [],
    isRoundTrip: Boolean(data.isBack),
    share: Boolean(data.canShared),
    carCategory: {
      id: "",
      name: data.carCategoryName,
    },
    wheelchair: data.wealTypeName,
    phone: data.noticePhone,
    createdAt: parse(data.createDate, "yyyy-MM-dd HH:mm:ss", new Date()),
    amount: {
      accompany: Number(data.etWithAmt),
      subsidy: Number(data.etDiscountAmt),
      self: Number(data.etSelfPay),
      total: Number(data.etTotalAmt),
    },
    mileage: Number(data.totalMileage),
    timeCost: Number(data.expectedMinute),
  };
}

type GetOrderResponse = BaseResponse & { result: OrderResponse };

export function getOrder({ token, id }: Token & { id: string }) {
  return get<GetOrderResponse>(
    KHH_API("OrderOfCaseUsers/GetDetail", {
      orderId: id,
    }),
    {
      "X-Token": token,
    }
  )
    .then(prop("result"))
    .then(toRecord);
}

interface CaseOrderAmtResponse {
  fromAddr: string;
  fromAddrName: string;
  toAddr: string;
  toAddrName: string;
  distance: number;
  duration: number;
  coordinates: number[][];
  withAmt: number;
  subsidyAmt: number;
  selfPayAmt: number;
  totalAmt: number;
}

interface GetCaseOrderAmtResponse extends BaseResponse {
  result: CaseOrderAmtResponse;
}

function toOrderAmount({
  withAmt,
  subsidyAmt,
  selfPayAmt,
  totalAmt,
}: CaseOrderAmtResponse): OrderAmount {
  return {
    accompany: withAmt,
    subsidy: subsidyAmt,
    self: selfPayAmt,
    total: totalAmt,
  };
}

/**
 * [GET /api/OrderOfCaseUsers/GetCaseOrderAmt]
 *
 * get Case Order Amount by orderNo from service
 */
export function getOrderAmount({
  token,
  caseID,
  from,
  to,
  accompanying,
  date,
}: Token &
  Pick<OrderDetail, "caseID" | "from" | "to" | "accompanying" | "date">) {
  return get<GetCaseOrderAmtResponse>(
    KHH_API("OrderOfCaseUsers/GetCaseOrderAmt", {
      CaseUserId: caseID,
      FromAddr: from.address,
      FromAddrId: from.id,
      ToAddr: to.address,
      ToAddrId: to.id,
      FamilyWith: accompanying,
      ReservationDate: format(date, "yyyy-MM-dd"),
    }),
    {
      "X-Token": token,
    }
  )
    .then(prop("result"))
    .then(toOrderAmount);
}

interface DespatchResponse {
  driverName: string;
  carNo: string;
  orderNos: string[];
}

interface GetDespatchResponse extends BaseResponse {
  result: DespatchResponse;
}

function toDispatch({
  driverName,
  carNo,
  orderNos,
}: DespatchResponse): Dispatch {
  return {
    driver: driverName,
    carNo,
    orderNos,
  };
}

/**
 * [GET /api/Despatchs/GetByOrderId]
 *
 * get Case Dispatch info by orderId from service
 */
export function getDispatch({ id, token }: Token & { id: string }) {
  return get<GetDespatchResponse>(
    KHH_API("Despatchs/GetByOrderId", { orderId: id }),
    {
      "X-Token": token,
    }
  )
    .then(prop("result"))
    .then(toDispatch);
}

interface StatusLogResponse {
  status: number;
  createDate: string;
  createUserName: string;
}

interface GetStatueLogResponse extends BaseResponse {
  result: StatusLogResponse[];
}

function toHistory(data: StatusLogResponse): OrderHistory {
  return {
    status: data.status,
    createdAt: parse(data.createDate, "yyyy-MM-dd HH:mm:ss", new Date()),
    creator: data.createUserName,
  };
}

/**
 * [GET /api/OrderOfCaseUsers/GetStatusLog]
 *
 * get Case Despatch info by orderId from service
 */
export function getOrderHistory({ id, token }: Token & { id: string }) {
  return get<GetStatueLogResponse>(
    KHH_API("OrderOfCaseUsers/GetStatusLog", { orderId: id }),
    {
      "X-Token": token,
    }
  )
    .then(prop("result"))
    .then(map(toHistory));
}
