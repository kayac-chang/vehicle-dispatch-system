import GoogleMapReact from "google-map-react";

export function RouteMap() {
  const center = {
    lat: 59.95,
    lng: 30.33,
  };

  const API_KEY = "AIzaSyBd6sR-KCtS5ZYKrn6VZInAIwB1uIV0GPg";

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: API_KEY }}
      defaultCenter={center}
      defaultZoom={11}
    ></GoogleMapReact>
  );
}
