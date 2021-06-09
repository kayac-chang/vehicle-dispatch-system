import { get, KHH_API, post } from "./base";
import { parse, format } from "date-fns";
import { pipe, prop } from "ramda";
import {
  CancelOrderRequest,
  RecordDetail,
  CaseOrderAmt,
  GeoCode,
  GetRouteRequest,
  Route,
} from "types/record";

const formatOnlyDate = pipe(
  (value: string) => parse(value, "yyyy-MM-dd HH:mm:ss", new Date()),
  (date) => format(date, "yyyy-MM-dd")
);

interface BaseResponse {
  code: number;
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
export function getCaseDetail(
  orderNo: string
): Promise<RecordDetail | undefined> {
  return get<GetCaseDetailResponse>(
    KHH_API("/api/OrderOfCaseUsers/GetDetail", { orderNo })
  ).then(pipe(prop("result"), toCaseDetail));
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
export function getCaseOrderAmt(
  orderNo: string
): Promise<CaseOrderAmt | undefined> {
  return get<GetCaseOrderAmtResponse>(
    KHH_API("/api/OrderOfCaseUsers/GetCaseOrderAmt", { orderNo })
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
  return get<GetGeoCodeResponse>(
    KHH_API("/api/Maps/Geocode", { address })
  ).then(pipe(prop("result"), toGeoCode));
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
  return post<GetRouteResponse>(KHH_API("/api/Maps/Route").url, payload).then(
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
    KHH_API("/api/OrderOfCaseUsers/CancelOrder").url,
    payload
  ).then(toCancelOrder);
}
