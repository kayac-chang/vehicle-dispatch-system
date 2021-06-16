export interface Record {
  id: string;
  order: string;
  date: Date;
  status: number;
  accompanying: number;
  name: string;
  from: string;
  to: string;
  phone: string;
  share: boolean;
  carCategory: {
    id: string;
    name: string;
  };
  cancel?: string;
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

export interface Dispatch {
  driver: string;
  carNo: string;
  orderNos: string[];
}
