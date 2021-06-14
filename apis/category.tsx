import { prop } from "ramda";
import { CarType } from "types";
import { get, KHH_API, BaseResponse } from "./base";

interface GetCarTypeResponse extends BaseResponse {
  result: CarType[];
}

export function getCarType() {
  return get<GetCarTypeResponse>(
    KHH_API("Categorys/GetDataByTypeId", { typeId: "SYS_CAR" })
  ).then(prop("result"));
}
