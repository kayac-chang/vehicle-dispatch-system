import clsx from "clsx";
import { Despatch, RecordDetail } from "types/record";
import { InfoSet } from "components/record";
import { RouteMap } from "components/atoms";

const content = {
  title: "行程一覽",
  journey: {
    title: "去程",
    totalMileage: {
      title: "預估距離",
      unit: "km",
    },
    expectedMinute: {
      title: "預估時間",
      unit: "分鐘",
    },
    canShared: {
      no: "共乘訂單編號",
    },
    address: {
      from: "起",
      to: "迄",
    },
  },
  label: {
    driverName: "司機姓名",
    carNo: "車牌號碼",
    carCategoryName: "車輛類型",
    wheelchairType: "輪椅類型",
    none: "無",
    unbooked: "未排班",
  },

  lon: "經度",
  lat: "緯度",
  note: "備註：",
};

type Props = {
  journey: RecordDetail | undefined;
  despatches: Despatch | undefined;
};
export function CaseInfo({ journey, despatches }: Props) {
  if (!journey || !despatches) return <></>;

  const despatchData = [
    {
      title: content.label.driverName,
      content: despatches.driverName || content.label.unbooked,
    },
    {
      title: content.label.carNo,
      content: despatches.carNo || content.label.unbooked,
    },
    {
      title: content.label.carCategoryName,
      content: journey.carCategoryName || content.label.none,
    },
    {
      title: content.label.wheelchairType,
      content: journey.wheelchairType || content.label.none,
    },
  ];
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
            title={content.journey.totalMileage.title}
            content={`${journey.totalMileage}${content.journey.totalMileage.unit}`}
            titleSize="sm"
            contentClass="text-sm text-blue-bright font-normal"
          />

          <InfoSet
            title={content.journey.expectedMinute.title}
            content={`${journey.expectedMinute}${content.journey.expectedMinute.unit}`}
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
          title={content.journey.totalMileage.title}
          content={`${journey.totalMileage}${content.journey.totalMileage.unit}`}
          titleSize="sm"
          contentClass="text-sm text-blue-bright font-normal"
          align="h"
        />

        <InfoSet
          className="lg:hidden"
          title={content.journey.expectedMinute.title}
          content={`${journey.expectedMinute}${content.journey.expectedMinute.unit}`}
          titleSize="sm"
          contentClass="text-sm text-blue-bright font-normal"
          align="h"
        />

        {despatchData.map((item, index) => (
          <InfoSet
            key={index}
            title={item.title}
            content={item.content}
            titleSize="sm"
          />
        ))}
      </div>

      <InfoSet
        title={content.journey.canShared.no}
        content={despatches.orderNos.join(", ") || content.label.unbooked}
        titleSize="xs"
        align="v"
      />

      <div className="flex space-x-4">
        <InfoSet
          title={content.lon}
          content={String(journey.fromLon)}
          titleSize="sm"
          align="h"
        />

        <InfoSet
          title={content.lat}
          content={String(journey.fromLat)}
          titleSize="sm"
          align="h"
        />
      </div>

      <div>
        <div className="flex items-center">
          <div className="flex items-center text-orange-rich font-semibold min-w-20 mr-2">
            <strong className="text-sm">{content.journey.address.from}</strong>
            <span className="text-xs ml-1">{`(${journey.fromAddrRemark})`}</span>
          </div>

          <p className="flex-1 px-4 py-2 rounded-xl bg-gray-extralight">
            {journey.fromAddr}
          </p>
        </div>

        <p className="text-xs text-red-alert font-medium">{`${content.note}???`}</p>
      </div>

      <div className="flex space-x-4">
        <InfoSet
          title={content.lon}
          content={String(journey.toLon)}
          titleSize="sm"
          align="h"
        />

        <InfoSet
          title={content.lat}
          content={String(journey.toLat)}
          titleSize="sm"
          align="h"
        />
      </div>

      <div>
        <div className="flex items-center">
          <div className="flex items-center text-orange-rich font-semibold min-w-20 mr-2">
            <strong className="text-sm">{content.journey.address.to}</strong>
            <span className="text-xs ml-1">{`(${journey.toAddrRemark})`}</span>
          </div>
          <p className="flex-1 px-4 py-2 rounded-xl bg-gray-extralight">
            {journey.toAddr}
          </p>
        </div>

        <p className="text-xs text-red-alert font-medium mb-4">{`${content.note}???`}</p>
      </div>

      <div className="h-64 -mx-6 lg:mx-0 bg-gray-extralight flex items-center justify-center">
        <RouteMap center={{ lng: journey.fromLon, lat: journey.fromLat }} />
      </div>
    </div>
  );
}
