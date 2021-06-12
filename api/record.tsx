import { get, KHH_API, post } from "./base";
import { parse, format } from "date-fns";
import { map, pipe, prop } from "ramda";
import {
  CancelOrderRequest,
  RecordDetail,
  CaseOrderAmt,
  GeoCode,
  GetRouteRequest,
  Route,
  ClientRecord,
  OrderPayOfCaseUsers,
  Despatch,
  StatueLog,
} from "types/record";
import {
  mockCaseGetDetail,
  mockDespatches,
  mockOrderPayOfCaseUsersDetail,
  mockStatusLog,
} from "./mockData";

const formatOnlyDate = (value: string) => {
  if (!value) return "";
  const date = parse(value, "yyyy-MM-dd HH:mm", new Date());
  return format(date, "yyyy-MM-dd");
};

interface BaseResponse {
  code: 200;
}

interface Token {
  token: string;
}

interface CaseOrderNo {
  orderNo: string;
}

interface ClientRecordResponse {
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

interface GetClientRecordResponse extends BaseResponse {
  data: ClientRecordResponse[];
  count: number;
}

function toClientRecord({
  caseUserNo,
  orderNo,
  id,
  userId,
  caseUserId,
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
  uid,
}: ClientRecordResponse): ClientRecord {
  return {
    caseUserNo: caseUserNo,
    orderNo: orderNo,
    id: id,
    userId: userId,
    caseUserId: caseUserId,
    cancelReamrk: cancelReamrk,
    status: status,
    reserveDate: formatOnlyDate(reserveDate),
    fromAddr: fromAddr,
    toAddr: toAddr,
    canShared: canShared,
    carCategoryId: carCategoryId,
    carCategoryName: carCategoryName,
    familyWith: familyWith,
    hasViolation: hasViolation,
    name: name,
    phone: phone,
    uid: uid,
  };
}

interface GetClientRecordQuery {
  limit: number;
  page: number;
  startDate: string;
  endDate: string;
  orderby: string;
  status: string;
}

interface ClientRecordRequest {
  props: Partial<GetClientRecordQuery> | undefined;
}

/**
 * [GET /api/OrderOfCaseUsers/LoadClient]
 *
 * get Client Record from service
 */
export function getClientRecord({
  props,
  token,
}: ClientRecordRequest & Token): Promise<
  { total: number; record: ClientRecord[] } | undefined
> {
  return get<GetClientRecordResponse>(
    KHH_API("OrderOfCaseUsers/LoadClient", {
      limit: props?.limit,
      page: props?.page,
      StartDate: props?.startDate,
      EndDate: props?.endDate,
      orderby: props?.orderby,
      Status: props?.status,
    }),
    {
      "X-Token": token,
    }
  ).then(({ data, count }) => ({
    total: Number(count),
    record: map(toClientRecord, data),
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
  orderNo,
  token,
}: CaseOrderNo & Token): Promise<RecordDetail | undefined> {
  return (
    get<GetCaseDetailResponse>(
      KHH_API("OrderOfCaseUsers/GetDetail", { orderNo }),
      {
        "X-Token": token,
      }
    )
      .then((res) => {
        // TODO: 刪掉mock，實際打回500
        if (!res) return toCaseDetail(mockCaseGetDetail.result);
        return toCaseDetail(res.result);
      })
      // TODO: 刪掉mock
      .catch(() => toCaseDetail(mockCaseGetDetail.result))
  );
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
  orderNo,
  token,
}: CaseOrderNo & Token): Promise<StatueLog[] | undefined> {
  return get<GetStatueLogResponse>(
    KHH_API("OrderOfCaseUsers/GetStatusLog", { orderNo }),
    {
      "X-Token": token,
    }
  ).then((res) => {
    // TODO: 刪掉mock, 實打回[]
    if (!res || res.result.length === 0)
      return toStatueLog(mockStatusLog.result);
    return toStatueLog(res.result);
  });
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
  orderNo,
  token,
}: CaseOrderNo & Token): Promise<Despatch | undefined> {
  return (
    get<GetDespatchResponse>(KHH_API("Despatchs/GetByOrderId", { orderNo }), {
      "X-Token": token,
    })
      .then(pipe(prop("result"), toDespatch))
      // TODO: 刪掉mock
      .catch(() => toDespatch(mockDespatches.result))
  );
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
  orderNo,
  token,
}: CaseOrderNo & Token): Promise<OrderPayOfCaseUsers | undefined> {
  return get<GetOrderPayOfCaseUsersResponse>(
    KHH_API("OrderPayOfCaseUsers/GetDetail", { orderNo }),
    {
      "X-Token": token,
    }
  ).then((res) => {
    // TODO: 刪掉mock
    if (!res.result)
      return toOrderPayOfCaseUsers(mockOrderPayOfCaseUsersDetail.result);
    return toOrderPayOfCaseUsers(res.result);
  });
  // .catch(() => toOrderPayOfCaseUsers(mockOrderPayOfCaseUsersDetail.result));
  // ).then(pipe(prop("result"), toOrderPayOfCaseUsers));
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

function toCaseOrderAmt({
  fromAddr,
  fromAddrName,
  toAddr,
  toAddrName,
  distance,
  duration,
  coordinates,
  withAmt,
  subsidyAmt,
  selfPayAmt,
  totalAmt,
}: CaseOrderAmtResponse): CaseOrderAmt {
  return {
    fromAddr: fromAddr,
    fromAddrName: fromAddrName,
    toAddr: toAddr,
    toAddrName: toAddrName,
    distance: distance,
    duration: duration,
    coordinates: coordinates,
    withAmt: withAmt,
    subsidyAmt: subsidyAmt,
    selfPayAmt: selfPayAmt,
    totalAmt: totalAmt,
  };
}

/**
 * [GET /api/OrderOfCaseUsers/GetCaseOrderAmt]
 *
 * get Case Order Amount by orderNo from service
 */
export function getCaseOrderAmt({
  orderNo,
  token,
}: CaseOrderNo & Token): Promise<CaseOrderAmt | undefined> {
  return get<GetCaseOrderAmtResponse>(
    KHH_API("OrderOfCaseUsers/GetCaseOrderAmt", { orderNo }),
    {
      "X-Token": token,
    }
  ).then(pipe(prop("result"), toCaseOrderAmt));
}

interface GeoCodeResponse {
  placeId: string;
  addrFormat: string;
  addrName: string;
  lon: number;
  lat: number;
}

interface GetGeoCodeResponse extends BaseResponse {
  result: GeoCodeResponse;
}

function toGeoCode({
  lon,
  lat,
  addrName,
  addrFormat,
}: GeoCodeResponse): GeoCode {
  return {
    lon: lon,
    lat: lat,
    addrName: addrName,
    addrFormat: addrFormat,
  };
}

/**
 * [GET /api/Maps/Geocode]
 *
 * get GeoCode by addr from service
 */
export function getGeoCode(address: string): Promise<GeoCode | undefined> {
  return get<GetGeoCodeResponse>(KHH_API("Maps/Geocode", { address })).then(
    pipe(prop("result"), toGeoCode)
  );
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
