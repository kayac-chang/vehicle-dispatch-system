export interface ClientRecord{
  caseUserNo: string;
  orderNo: string;
  id: string;
  userId: string;
  caseUserId: string;
  cancelReamrk: string;
  status: number;
  reserveDate:string;
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

export interface RecordDetail {
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
  reserveDate: string,
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

export interface CaseOrderAmt {
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

export interface GeoCode {
  // placeId: string;
  addrFormat: string;
  addrName: string;
  lon: number;
  lat: number;
}

export interface GetRouteRequest {
  fromAddr: string;
  toAddr: string;
}

export interface Route {
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

export interface CancelOrderRequest {
  id: string;
  cancelRemark: "CLIENT" |"CLIENT_NOTARRIVED";
  hasVilation: boolean;
  point: number;
  remark: string;
}

export interface Despatch {
  driverName: string;
  carNo:      string;
  orderNos:   string[];
}

export interface OrderPayOfCaseUsers {
  id:              string;
  realFamilyWith:  number;
  realMaidWith:    number;
  realWithAmt:     number;
  realDiscountAmt: number;
  realSelfPay:     number;
  receivePay:      number;
  signPic:         string;
  remark:          string;
  useDiscount:     number;
}

export interface History{
  status:   string;
  editDate: string;
  editor:   string;
}