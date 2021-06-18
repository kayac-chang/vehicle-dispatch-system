import clsx from "clsx";
import { Link } from "components/atoms";

const content = {
  title: "高雄市政府預約訂平台",
  anchor: "高雄市政府預約訂平台 回首頁",
  img: "高雄市政府之商標",
};

export function Logo() {
  return (
    <Link
      title={content.anchor}
      href="/"
      role="home"
      className={clsx(
        "flex items-center space-x-2 p-4",
        "w-full lg:w-auto lg:pl-4 lg:pr-20",
        "bg-none lg:bg-mask lg:bg-cover bg-no-repeat",
        "text-green-normal",
        "hover:underline"
      )}
    >
      <img
        className="w-12"
        src="/images/logo.png"
        alt={content.img}
        aria-hidden
      />

      <span className={clsx("text-base font-medium tracking-wider bg-white")}>
        {content.title}
      </span>
    </Link>
  );
}
