import GoogleMapReact from "google-map-react";
type Props = {
  center?: { lng: number; lat: number };
  from?: { lng: number; lat: number };
  to?: { lng: number; lat: number };
};
export function RouteMap({ center, from, to }: Props) {
  const init = {
    lat: 22.611729,
    lng: 120.30026,
  };

  const API_KEY = "AIzaSyBd6sR-KCtS5ZYKrn6VZInAIwB1uIV0GPg";

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: API_KEY }}
      defaultCenter={center || init}
      defaultZoom={11}
    ></GoogleMapReact>
  );
}
