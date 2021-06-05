export interface News {
  id: string;
  category: string;
  date: string;
  title: string;
  content: string;
}

// TODO:改成正確的資料型態
export interface RecordListTypes {
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
export type CorpInfoTypes = {
  name: string;
  tel: string;
  operatingHours: string[];
  customerServiceHours: string[];
};
