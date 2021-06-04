import clsx from "clsx";
import { Icon } from "components/atoms";
import { CorpInfoTypes } from "types";

type ServiceTimeProps = {
  title: string;
  list: string[];
};
function ServiceTime({ title, list }: ServiceTimeProps) {
  return (
    <div
      className={clsx(
        "flex flex-col space-x-0 py-1",
        "lg:flex-row lg:items-center lg:space-x-6"
      )}
    >
      <h4 className="text-sm text-gold-darker font-semibold">{title}</h4>
      <ul className="flex flex-wrap text-xs font-medium text-gray-900">
        {list.map((item, index) => (
          <li className="w-32 my-2" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

type CardProps = {
  info: CorpInfoTypes;
};
export function Card({ info }: CardProps) {
  return (
    <article className="p-4 lg:p-6 bg-white rounded-lg shadow-lg mb-6">
      <h3 className="text-lg text-gray-900 font-semibold mb-3">{info.name}</h3>
      <div className="flex flex-col justify-between">
        <div
          className={clsx(
            "flex items-start flex-col justify-start",
            "lg:items-center lg:flex-row lg:justify-between"
          )}
        >
          <div className="flex items-center">
            <button
              className={clsx(
                " text-white rounded-lg bg-gold-darker px-2 py-1 flex items-center mr-4",
                "lg:text-gray-900 lg:bg-transparent lg:p-0 lg:mr-1"
              )}
            >
              <span className="w-4 h-4">
                <Icon.PhoneOutline />
              </span>
              <span className="block lg:hidden ml-1 text-sm tracking-wide">
                致電
              </span>
            </button>
            <h4 className="text-sm text-gray-900 font-medium">{info.tel}</h4>
          </div>
          <p className="pt-2 lg:p-0 text-sm text-orange-dark font-semibold">
            國定假日提前預約，皆可服務，依車行調度情況。
          </p>
        </div>
      </div>
      <hr className="my-3 border-gray-400" />
      <div>
        <ServiceTime title="車趟服務時間" list={info.operatingHours} />

        <ServiceTime title="客服服務時間" list={info.customerServiceHours} />
      </div>
    </article>
  );
}
