export * from "./news";

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

// TODO:改成正確的資料型態
export interface Record {
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  passenger: string;
  isCarpool: boolean;
  ridership: number;
  orderNo: string;
  pickUpDate: string;
  carType: 1 | 2;
  pickupLocation: string;
  dropLocation: string;
}

// TODO:改成正確的資料型態
export interface RecordDetail {
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  passenger: string;
  isCarpool: true;
  orderNo: string;
  pickDate: string;
  caseNo: string;
  phone: string;
  phoneSms: string;
  caseDistance: number;
  caseCostTime: number;
  basicInfo: { title: string; content: string }[];
  caseInfo: { title: string; content: string }[];
  carpoolNo: string;
  pickupInfo: {
    lat: number;
    lon: number;
    description: string;
    address: string;
    note: string;
  };
  dropInfo: {
    lat: number;
    lon: number;
    description: string;
    address: string;
    note: string;
  };
  mapInfo: {};
  paymentInfo: { title: string; content: string }[];
  paymentNote: string;
  signature: string;
  history: { status: string; editDate: string; editor: string }[];
}
