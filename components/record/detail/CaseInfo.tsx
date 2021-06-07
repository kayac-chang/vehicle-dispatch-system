import clsx from "clsx";
import { RecordDetail } from "types";
import { InfoSet } from "components/record";
import { RouteMap } from "components/atoms";

const content = {
  title: "行程一覽",
  journey: {
    title: "去程",
    distance: {
      title: "預估距離",
      unit: "km",
    },
    cost: {
      title: "預估時間",
      unit: "分鐘",
    },
    carpool: {
      no: "共乘訂單編號",
      none: "未排班",
    },
    address: {
      from: "起",
      to: "迄",
    },
  },

  lon: "經度",
  lat: "緯度",
  note: "備註：",
};

type Props = {
  item: RecordDetail;
};
export function CaseInfo({ item }: Props) {
  return (
    <div className="p-6 py-3 bg-white flex flex-col space-y-3">
      <div className="flex items-center border-b space-x-6">
        <strong className="text-lg font-bold border-b-4 border-gold-darker py-1">
          {content.title}
        </strong>

        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-sm bg-red-alert" />

          <span className="text-orange-darker font-semibold">
            {content.journey.title}
          </span>
        </div>

        <div className="hidden lg:flex space-x-6">
          <InfoSet
            title={content.journey.distance.title}
            content={`${item.caseDistance}${content.journey.distance.unit}`}
            titleSize="sm"
            contentClass="text-sm text-blue-bright font-normal"
          />

          <InfoSet
            title={content.journey.cost.title}
            content={`${item.caseCostTime}${content.journey.cost.unit}`}
            titleSize="sm"
            contentClass="text-sm text-blue-bright font-normal"
          />
        </div>
      </div>

      <div
        className={clsx(
          "flex flex-col space-x-0 space-y-4",
          "lg:flex-row lg:w-full lg:flex-wrap lg:space-x-4 lg:space-y-0 lg:-ml-4"
        )}
      >
        <InfoSet
          className="lg:hidden"
          title={content.journey.distance.title}
          content={`${item.caseDistance}${content.journey.distance.unit}`}
          titleSize="sm"
          contentClass="text-sm text-blue-bright font-normal"
          align="h"
        />

        <InfoSet
          className="lg:hidden"
          title={content.journey.cost.title}
          content={`${item.caseCostTime}${content.journey.cost.unit}`}
          titleSize="sm"
          contentClass="text-sm text-blue-bright font-normal"
          align="h"
        />

        {item.caseInfo.map((item, index) => (
          <InfoSet
            key={index}
            title={item.title}
            content={item.content}
            titleSize="sm"
          />
        ))}
      </div>

      <InfoSet
        title={content.journey.carpool.no}
        content={item.carpoolNo || content.journey.carpool.none}
        titleSize="xs"
        align="v"
      />

      <div className="flex space-x-4">
        <InfoSet
          title={content.lon}
          content={String(item.pickupInfo.lon)}
          titleSize="sm"
          align="h"
        />

        <InfoSet
          title={content.lat}
          content={String(item.pickupInfo.lat)}
          titleSize="sm"
          align="h"
        />
      </div>

      <div>
        <div className="flex items-center">
          <div
            className="flex items-center text-orange-rich font-semibold"
            style={{ minWidth: "5rem" }}
          >
            <strong className="text-sm">{content.journey.address.from}</strong>

            <span className="text-xs ml-1">{`(${item.pickupInfo.description})`}</span>
          </div>

          <p className="flex-1 px-4 py-2 rounded-xl bg-gray-extralight">
            {item.pickupInfo.address}
          </p>
        </div>

        <p className="text-xs text-red-alert font-medium">{`${content.note}${item.pickupInfo.note}`}</p>
      </div>

      <div className="flex space-x-4">
        <InfoSet
          title={content.lon}
          content={String(item.dropInfo.lon)}
          titleSize="sm"
          align="h"
        />

        <InfoSet
          title={content.lat}
          content={String(item.dropInfo.lat)}
          titleSize="sm"
          align="h"
        />
      </div>

      <div>
        <div className="flex items-center">
          <div
            className="flex items-center text-orange-rich font-semibold"
            style={{ minWidth: "5rem" }}
          >
            <strong className="text-sm">{content.journey.address.to}</strong>

            <span className="text-xs ml-1">{`(${item.dropInfo.description})`}</span>
          </div>
          <p className="flex-1 px-4 py-2 rounded-xl bg-gray-extralight">
            {item.dropInfo.address}
          </p>
        </div>

        <p className="text-xs text-red-alert font-medium mb-4">{`${content.note}${item.dropInfo.note}`}</p>
      </div>

      <div className="h-64 -mx-6 lg:mx-0 bg-gray-extralight flex items-center justify-center">
        <RouteMap />
      </div>
    </div>
  );
}
