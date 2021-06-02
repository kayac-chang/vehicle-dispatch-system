export function statusDecoder(status: number) {
  switch (status) {
    case 1:
      return "新訂單";
    case 2:
      return "已排班";
    case 3:
      return "抵達搭車地點";
    case 4:
      return "客上";
    case 5:
      return "已完成";
    case 6:
      return "單位取消";
    case 7:
      return "已取消";
    case 8:
      return "空趟";
    case 9:
      return "無派車";
  }
}
