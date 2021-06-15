import { get, KHH_API, post, BaseResponse, Token } from "./base";
import { parse, format } from "date-fns";
import { map, pipe, prop } from "ramda";
import {
  CancelOrderRequest,
  RecordDetail,
  GetRouteRequest,
  Route,
  Record,
  OrderPayOfCaseUsers,
  Despatch,
  StatueLog,
  Order,
  OrderAmount,
} from "types";

const formatOnlyDate = (value: string) => {
  if (!value) return "";
  const date = parse(value, "yyyy-MM-dd HH:mm:ss", new Date());
  return format(date, "yyyy-MM-dd");
};

interface CaseOrderNo {
  orderId: string;
}

interface RecordResponse {
  caseUserNo: string;
  orderNo: string;
  id: string;
  userId: string;
  caseUserId: string;
  cancelReamrk: string;
  status: number;
  reserveDate: string;
  fromAddr: string;
  toAddr: string;
  canShared: boolean;
  carCategoryId: string;
  carCategoryName: string;
  familyWith: number;
  hasViolation: boolean;
  name: string;
  phone: string;
  uid: string;
}

interface GetRecordResponse extends BaseResponse {
  data: RecordResponse[];
  count: number;
}

function toRecord({
  orderNo,
  id,
  cancelReamrk,
  status,
  reserveDate,
  fromAddr,
  toAddr,
  canShared,
  carCategoryId,
  carCategoryName,
  familyWith,
  hasViolation,
  name,
  phone,
}: RecordResponse): Record {
  return {
    id,
    order: orderNo,
    from: fromAddr,
    to: toAddr,
    name,
    phone,
    accompanying: Number(familyWith),
    violation: Boolean(hasViolation),
    share: Boolean(canShared),
    carCategory: {
      id: carCategoryId,
      name: carCategoryName,
    },
    date: parse(reserveDate, "yyyy-MM-dd HH:mm:ss", new Date()),
    status,
    cancel: cancelReamrk ? cancelReamrk : undefined,
  };
}

interface GetClientRecordQuery {
  limit: number;
  page: number;
  from: Date;
  end: Date;
}

/**
 * [GET /api/OrderOfCaseUsers/LoadClient]
 *
 * get Client Record from service
 */
export function getRecord({
  token,
  limit,
  page,
  from,
  end,
}: Partial<GetClientRecordQuery> & Token): Promise<{
  total: number;
  records: Record[];
}> {
  return get<GetRecordResponse>(
    KHH_API("OrderOfCaseUsers/LoadClient", {
      limit,
      page,
      StartDate: from && format(from, "yyyy-MM-dd"),
      EndDate: end && format(end, "yyyy-MM-dd"),
    }),
    {
      "X-Token": token,
    }
  ).then(({ data, count }) => ({
    total: Number(count),
    records: map(toRecord, data),
  }));
}

interface CaseDetailResponse {
  id: string;
  caseUserId: string;
  orgName: string;
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
  fromAddrRemark: string;
  toAddr: string;
  toAddrRemark: string;
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

interface GetCaseDetailResponse extends BaseResponse {
  result: CaseDetailResponse;
}

function toCaseDetail({
  id,
  caseUserId,
  orgName,
  createdIdentity,
  createDate,
  userName,
  userUID,
  userPhone,
  orderNo,
  caseUserNo,
  reserveDate,
  status,
  fromAddr,
  fromAddrRemark,
  toAddr,
  toAddrRemark,
  fromLat,
  fromLon,
  toLat,
  toLon,
  carCategoryName,
  wheelchairType,
  familyWith,
  maidWith,
  noticePhone,
  canShared,
  etTotalAmt,
  etDiscountAmt,
  etSelfPay,
  etWithAmt,
  cancelRemark,
  wealTypeId,
  wealTypeName,
  expectedMinute,
  totalMileage,
  isBack,
}: CaseDetailResponse): RecordDetail {
  return {
    id: id,
    caseUserId: caseUserId,
    orgName: orgName,
    createdIdentity: createdIdentity,
    createDate: formatOnlyDate(createDate),
    userName: userName,
    userUID: userUID,
    userPhone: userPhone,
    orderNo: orderNo,
    caseUserNo: caseUserNo,
    reserveDate: formatOnlyDate(reserveDate),
    status: status,
    fromAddr: fromAddr,
    fromAddrRemark: fromAddrRemark,
    toAddr: toAddr,
    toAddrRemark: toAddrRemark,
    fromLat: fromLat,
    fromLon: fromLon,
    toLat: toLat,
    toLon: toLon,
    carCategoryName: carCategoryName,
    wheelchairType: wheelchairType,
    familyWith: familyWith,
    maidWith: maidWith,
    noticePhone: noticePhone,
    canShared: canShared,
    etTotalAmt: etTotalAmt,
    etDiscountAmt: etDiscountAmt,
    etSelfPay: etSelfPay,
    etWithAmt: etWithAmt,
    cancelRemark: cancelRemark,
    wealTypeId: wealTypeId,
    wealTypeName: wealTypeName,
    expectedMinute: expectedMinute,
    totalMileage: totalMileage,
    isBack: isBack,
  };
}

/**
 * [GET /api/OrderOfCaseUsers/GetDetail]
 *
 * get Case Detail by orderNo from service
 */
export function getCaseDetail({
  orderId,
  token,
}: CaseOrderNo & Token): Promise<RecordDetail | undefined> {
  return get<GetCaseDetailResponse>(
    KHH_API("OrderOfCaseUsers/GetDetail", { orderId }),
    {
      "X-Token": token,
    }
  ).then(pipe(prop("result"), toCaseDetail));
}

interface GetStatueLogResponse extends BaseResponse {
  result: StatueLog[];
}

function toStatueLog(result: StatueLog[]): StatueLog[] {
  return result;
}

/**
 * [GET /api/OrderOfCaseUsers/GetStatusLog]
 *
 * get Case Despatch info by orderId from service
 */
export function getStatusLog({
  orderId,
  token,
}: CaseOrderNo & Token): Promise<StatueLog[] | undefined> {
  return get<GetStatueLogResponse>(
    KHH_API("OrderOfCaseUsers/GetStatusLog", { orderId }),
    {
      "X-Token": token,
    }
  ).then(pipe(prop("result"), toStatueLog));
}

interface DespatchResponse {
  driverName: string;
  carNo: string;
  orderNos: string[];
}

interface GetDespatchResponse extends BaseResponse {
  result: DespatchResponse;
}

function toDespatch({
  driverName,
  carNo,
  orderNos,
}: DespatchResponse): Despatch {
  return {
    driverName: driverName,
    carNo: carNo,
    orderNos: orderNos,
  };
}

/**
 * [GET /api/Despatchs/GetByOrderId]
 *
 * get Case Despatch info by orderId from service
 */
export function getDespatchByOrderId({
  orderId,
  token,
}: CaseOrderNo & Token): Promise<Despatch | undefined> {
  return get<GetDespatchResponse>(
    KHH_API("Despatchs/GetByOrderId", { orderId }),
    {
      "X-Token": token,
    }
  ).then(pipe(prop("result"), toDespatch));
}

interface OrderPayOfCaseUsersResponse {
  id: string;
  realFamilyWith: number;
  realMaidWith: number;
  realWithAmt: number;
  realDiscountAmt: number;
  realSelfPay: number;
  receivePay: number;
  signPic: string;
  remark: string;
  useDiscount: number;
}

interface GetOrderPayOfCaseUsersResponse extends BaseResponse {
  result: OrderPayOfCaseUsersResponse;
}

function toOrderPayOfCaseUsers({
  id,
  realFamilyWith,
  realMaidWith,
  realWithAmt,
  realDiscountAmt,
  realSelfPay,
  receivePay,
  signPic,
  remark,
  useDiscount,
}: OrderPayOfCaseUsersResponse): OrderPayOfCaseUsers {
  return {
    id: id,
    realFamilyWith: realFamilyWith,
    realMaidWith: realMaidWith,
    realWithAmt: realWithAmt,
    realDiscountAmt: realDiscountAmt,
    realSelfPay: realSelfPay,
    receivePay: receivePay,
    signPic: signPic,
    remark: remark,
    useDiscount: useDiscount,
  };
}

/**
 * [GET /api/OrderPayOfCaseUsers/GetDetail]
 *
 * get Case payment detail by orderNo from service
 */
export function getOrderPayOfCaseUsers({
  orderId,
  token,
}: CaseOrderNo & Token): Promise<OrderPayOfCaseUsers | undefined> {
  return get<GetOrderPayOfCaseUsersResponse>(
    KHH_API("OrderPayOfCaseUsers/GetDetail", { orderId }),
    {
      "X-Token": token,
    }
  ).then(pipe(prop("result"), toOrderPayOfCaseUsers));
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
}: Token & Order) {
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
  ).then(pipe(prop("result"), toOrderAmount));
}

interface RouteResponse {
  fromAddr: string;
  fromAddrId: string;
  fromAddrName: string;
  fromLon: number;
  fromLat: number;
  toAddr: string;
  toAddrId: string;
  toAddrName: string;
  toLon: number;
  toLat: number;
  distance: number;
  duration: number;
  highwayMileage: number;
  polyLine: string;
  totalRoad: number;
  coordinates: number[][];
}

interface GetRouteResponse extends BaseResponse {
  result: RouteResponse;
}

function toRoute({
  fromAddr,
  fromAddrId,
  fromAddrName,
  fromLon,
  fromLat,
  toAddr,
  toAddrId,
  toAddrName,
  toLon,
  toLat,
  distance,
  duration,
  highwayMileage,
  polyLine,
  totalRoad,
  coordinates,
}: RouteResponse): Route {
  return {
    fromAddr: fromAddr,
    fromAddrId: fromAddrId,
    fromAddrName: fromAddrName,
    fromLon: fromLon,
    fromLat: fromLat,
    toAddr: toAddr,
    toAddrId: toAddrId,
    toAddrName: toAddrName,
    toLon: toLon,
    toLat: toLat,
    distance: distance,
    duration: duration,
    highwayMileage: highwayMileage,
    polyLine: polyLine,
    totalRoad: totalRoad,
    coordinates: coordinates,
  };
}

/**
 * [POST /api/Maps/Route]
 *
 * get Route by from - to addr from service
 */
export function getRoute(payload: GetRouteRequest): Promise<Route | undefined> {
  return post<GetRouteResponse>(KHH_API("Maps/Route").url, payload).then(
    pipe(prop("result"), toRoute)
  );
}

function toCancelOrder({ code }: BaseResponse): BaseResponse {
  return {
    code: code,
  };
}

/**
 * [POST /api/OrderOfCaseUsers/CancelOrder]
 *
 * cancel Order from service
 */
export function cancelOrder(
  payload: CancelOrderRequest
): Promise<BaseResponse | undefined> {
  return post<BaseResponse>(
    KHH_API("OrderOfCaseUsers/CancelOrder"),
    payload
  ).then(toCancelOrder);
}
