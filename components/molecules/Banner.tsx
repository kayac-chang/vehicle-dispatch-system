import clsx from "clsx";

type BannerProps = {
  className?: string;
};
export function Banner({ className }: BannerProps) {
  return (
    <section role="banner" className={clsx("py-4", className)}>
      <div className="w-20 lg:w-40 mx-auto">
        <img src="/images/car.png" alt="高雄市政府預約訂平台之商標" />
      </div>

      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-gray-dark text-xl md:text-4xl font-semibold tracking-wider">
          高雄市政府
        </h2>

        <p className="text-gray-light text-sm md:text-xl px-2 tracking-wide">
          長照交通接送統一預約服務及管理系統
        </p>
      </div>
    </section>
  );
}
