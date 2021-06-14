export * from "./news";
export * from "./user";
export * from "./user-info";
export * from "./record";

export interface QNA {
  name: string;
  title: string;
  description: string;
}

// TODO:改成正確的資料型態
export interface Corporation {
  name: string;
  tel: string;
  description?: string;
  operatingHours: string[];
  customerServiceHours: string[];
}

export interface Path {
  id: string;
  name: string;
  from: string;
  to: string;
}

export interface Organization {
  id: string;
  name: string;
}

export interface Discount {
  caseID: string;
  used: number;
  remain: number;
  total: number;
}
