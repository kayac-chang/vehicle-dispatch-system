import clsx from "clsx";
import { Icon } from "components/atoms";
import { Corporation } from "types";

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
      <strong className="text-sm text-gold-darker font-semibold">
        {title}
      </strong>

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

const content = {
  phone: "致電",
  operating: "車趟服務時間",
  customerService: "客服服務時間",
};

type CardProps = {
  info: Corporation;
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
          <div className="flex items-center space-x-2">
            <button
              className={clsx(
                "text-white rounded-lg bg-gold-darker px-2 py-1 flex items-center",
                "lg:text-black lg:bg-transparent"
              )}
            >
              <span className="w-4" aria-hidden>
                <Icon.PhoneOutline />
              </span>

              <span className="block lg:sr-only ml-1 text-sm tracking-wide">
                {content.phone}
              </span>
            </button>

            <span className="text-sm font-medium">{info.tel}</span>
          </div>

          {info.description && (
            <p className="text-sm text-orange-dark font-semibold">
              {info.description}
            </p>
          )}
        </div>
      </div>

      <hr className="my-3 border-gray-400" aria-hidden />

      <div>
        <ServiceTime title={content.operating} list={info.operatingHours} />

        <ServiceTime
          title={content.customerService}
          list={info.customerServiceHours}
        />
      </div>
    </article>
  );
}
