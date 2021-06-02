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
