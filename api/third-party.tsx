import fetch from "node-fetch";

const API =
  "https://gist.githubusercontent.com/abc873693/2804e64324eaaf26515281710e1792df/raw/a1e1fc17d04b47c564bbd9dba0d59a6a325ec7c1/taiwan_districts.json";

// GET taiwan districts from open source API
export function getTaiwanDistricts() {
  return fetch(API).then((data) => data.json());
}
