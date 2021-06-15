export interface OrderAddress {
  id: string;
  address: string;
}

export interface Order {
  caseID: string;
  from: OrderAddress;
  to: OrderAddress;
  accompanying: number;
  date: Date;
  cancel?: string;
}

export interface OrderDetail extends Order {
  userID: string;
  identity: string;
  organizations: string[];
  from: OrderAddress & {
    note?: string;
  };
  to: OrderAddress & {
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

export interface OrderAmount {
  accompany: number;
  subsidy: number;
  self: number;
  total: number;
}
