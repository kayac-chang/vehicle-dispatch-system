import { prop } from "ramda";
import { get, BaseResponse, KHH_API } from "./base";
import { Geocode } from "types";

interface GeocodeResponse {
  placeId: string;
  addrFormat: string;
  addrName: string;
  lon: number;
  lat: number;
}

interface GetGeocodeResponse extends BaseResponse {
  result: GeocodeResponse;
}

function toGeocode(data: GeocodeResponse): Geocode {
  return {
    id: data.placeId,
    address: data.addrFormat,
    lon: data.lon,
    lat: data.lat,
  };
}

export function getGeocode(address: string) {
  return get<GetGeocodeResponse>(KHH_API("Maps/Geocode", { _addr: address }))
    .then(prop("result"))
    .then(toGeocode);
}
