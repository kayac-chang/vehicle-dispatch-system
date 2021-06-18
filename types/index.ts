export * from "./news";
export * from "./user";
export * from "./record";
export * from "./order";

export interface QNA {
  name: string;
  title: string;
  description: string;
}

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

export interface CarType {
  value: string;
  label: string;
}

export interface Geocode {
  id: string;
  address: string;
  lon: number;
  lat: number;
}
