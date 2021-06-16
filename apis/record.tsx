import { get, KHH_API, post, BaseResponse, Token } from "./base";
import { parse, format } from "date-fns";
import { map, pipe, prop } from "ramda";
import { GetRouteRequest, Route, Record } from "types";

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

interface GetRecordQuery {
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
}: Partial<GetRecordQuery> & Token): Promise<{
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
