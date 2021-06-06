import { Button } from "components/atoms";
import GoogleMapReact from "google-map-react";

export function RouteMap() {
  const center = {
    lat: 59.95,
    lng: 30.33,
  };

  const API_KEY = "AIzaSyBd6sR-KCtS5ZYKrn6VZInAIwB1uIV0GPg";

  return (
    <div className="-mx-4">
      <div className="bg-black bg-opacity-75 flex justify-end text-xs py-3 space-x-4 px-4">
        <div className="w-1/3">
          <Button.Outline type="button" className="bg-white h-full">
            新增下個地點
          </Button.Outline>
        </div>
        <div className="w-1/3">
          <Button.Flat type="button" className="h-full py-2">
            立即預約
          </Button.Flat>
        </div>
      </div>

      <div className="h-48 w-full">
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={center}
          defaultZoom={11}
        ></GoogleMapReact>
      </div>
    </div>
  );
}
