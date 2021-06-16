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
  userPhone: string;
  createdAt: Date;
  amount: OrderAmount;
  caseNo: string;
  mileage: number;
  timeCost: number;
}

export interface OrderAmount {
  accompany: number;
  subsidy: number;
  self: number;
  total: number;
}

export interface OrderHistory {
  status: OrderStatus;
  createdAt: Date;
  creator: string;
}

export enum OrderStatus {
  NewOrder = 1,
  Booked = 2,
  Arrived = 3,
  Driving = 4,
  Done = 5,
  Canceled = 9,
}

const content = {
  status: {
    newOrder: "新訂單",
    booked: "已排班",
    arrived: "已抵達",
    driving: "客上",
    done: "完成",
    canceled: "已取消",
  },
};

export function statusDecoder(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.NewOrder:
      return content.status.newOrder;
    case OrderStatus.Booked:
      return content.status.booked;
    case OrderStatus.Arrived:
      return content.status.arrived;
    case OrderStatus.Driving:
      return content.status.driving;
    case OrderStatus.Done:
      return content.status.done;
    case OrderStatus.Canceled:
      return content.status.canceled;
    default:
      return "";
  }
}
