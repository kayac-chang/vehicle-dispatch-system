import clsx from "clsx";

export function Logo() {
  return (
    <div
      className={clsx(
        "flex items-center space-x-2 py-3 px-4",
        "w-full lg:w-auto lg:pl-4 lg:pr-20",
        "bg-none lg:bg-mask lg:bg-cover bg-no-repeat"
      )}
    >
      <img className="w-14" src="/images/logo.png" alt="高雄市政府預約訂平台" />

      <span className="text-green font-medium tracking-widest">
        高雄市政府預約訂平台
      </span>
    </div>
  );
}
