export interface ClientRecord {
  caseUserNo: string;
  orderNo: string;
  id: string;
  userId: string;
  caseUserId: string;
  cancelRemark: string;
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

interface OrderAddress {
  id: string;
  address: string;
}

export interface Order {
  caseID: string;
  from: OrderAddress;
  to: OrderAddress;
  accompanying: number;
  date: Date;
}

export interface OrderDetail extends Order {
  userID: string;
  identity: string;
  organizations: string[];
  from: OrderAddress & {
    note: string;
  };
  to: OrderAddress & {
    note: string;
  };
  note: string;
  isRoundTrip: boolean;
  share: boolean;
  carCategory: {
    id: string;
    name: string;
  };
  wheelchair: string;
  phone: string;
}

export interface OrderAmount {
  accompany: number;
  subsidy: number;
  self: number;
  total: number;
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
  cancelRemark: "CLIENT" | "CLIENT_NOTARRIVED";
  hasVilation: boolean;
  point: number;
  remark: string;
}

export interface Despatch {
  driverName: string;
  carNo: string;
  orderNos: string[];
}

export interface OrderPayOfCaseUsers {
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

export interface StatueLog {
  status: number;
  createDate: string;
  createUserName: string;
}

export interface History {
  status: string;
  editDate: string;
  editor: string;
}
