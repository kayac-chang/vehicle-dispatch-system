import clsx from "clsx";
import { RecordDetailTypes } from "types";
import { InfoSet } from "components/record";

type Props = {
  item: RecordDetailTypes;
};

export function CaseInfo({ item }: Props) {
  return (
    <section className="p-6 py-3 bg-white flex flex-col space-y-3">
      <header className="flex items-center border-b space-x-6">
        <h3 className="text-lg font-bold border-b-4 border-gold-darker py-1">
          行程一覽
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-sm bg-red-alert"></div>
          <span className="text-base text-orange-rich font-semibold">去程</span>
        </div>
        <div className="hidden lg:flex space-x-6">
          <InfoSet
            title="預估距離"
            content={`${item.caseDistance}km`}
            titleSize="sm"
            contentClass="text-sm text-blue-bright font-normal"
          />

          <InfoSet
            title="預估時間"
            content={`${item.caseCostTime}分鐘`}
            titleSize="sm"
            contentClass="text-sm text-blue-bright font-normal"
          />
        </div>
      </header>

      <div
        className={clsx(
          "flex flex-col space-x-0 space-y-4",
          "lg:flex-row lg:w-full lg:flex-wrap lg:space-x-4 lg:space-y-0 lg:-ml-4"
        )}
      >
        <InfoSet
          className="lg:hidden"
          title="預估距離"
          content={`${item.caseDistance}km`}
          titleSize="sm"
          contentClass="text-sm text-blue-bright font-normal"
          align="h"
        />

        <InfoSet
          className="lg:hidden"
          title="預估時間"
          content={`${item.caseCostTime}分鐘`}
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
        title="共乘訂單編號"
        content={item.carpoolNo === "" ? "未排班" : item.carpoolNo}
        titleSize="xs"
        align="v"
      />

      <div className="flex space-x-4">
        <InfoSet
          title="經度"
          content={item.pickupInfo.lon.toString()}
          titleSize="sm"
          align="h"
        />
        <InfoSet
          title="緯度"
          content={item.pickupInfo.lat.toString()}
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
            <h4 className="text-sm">起</h4>
            <span className="text-xs ml-1">{`(${item.pickupInfo.description})`}</span>
          </div>
          <p className="flex-1 px-4 py-2 rounded-xl bg-gray-extralight">
            {item.pickupInfo.address}
          </p>
        </div>
        <p className="text-xs text-red-alert font-medium">{`備註：${item.pickupInfo.note}`}</p>
      </div>

      <div className="flex space-x-4">
        <InfoSet
          title="經度"
          content={item.dropInfo.lon.toString()}
          titleSize="sm"
          align="h"
        />
        <InfoSet
          title="緯度"
          content={item.dropInfo.lat.toString()}
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
            <h4 className="text-sm">迄</h4>
            <span className="text-xs ml-1">{`(${item.dropInfo.description})`}</span>
          </div>
          <p className="flex-1 px-4 py-2 rounded-xl bg-gray-extralight">
            {item.dropInfo.address}
          </p>
        </div>
        <p className="text-xs text-red-alert font-medium mb-4">{`備註：${item.dropInfo.note}`}</p>
      </div>

      <div className="h-64 -mx-6 lg:mx-0 bg-gray-extralight flex items-center justify-center">
        GOOGLE MAP
        {/* {item.mapInfo} */}
      </div>
    </section>
  );
}
