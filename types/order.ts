import { Geocode } from "types";

export interface Order {
  caseID: string;
  accompanying: number;
  date: Date;
  cancel?: string;
}

export interface OrderDetail extends Order {
  userID: string;
  identity: string;
  organizations: string[];
  from: Geocode & {
    note?: string;
  };
  to: Geocode & {
    note?: string;
  };
  note?: string;
  isRoundTrip: boolean;
  share: boolean;
  carCategory: {
    id: string;
    name: string;
  };
  wheelchair: string;
  phone: string;
}

export interface OrderDetailRecord extends OrderDetail {
  id: string;
  order: string;
  status: number;
  name: string;
}

export interface OrderAmount {
  accompany: number;
  subsidy: number;
  self: number;
  total: number;
}
