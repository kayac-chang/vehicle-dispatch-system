import clsx from "clsx";

const content = {
  img: {
    src: "/images/car.png",
    alt: "高雄市政府預約訂平台之商標",
  },
  title: "高雄市政府",
  description: "長照交通接送統一預約服務及管理系統",
};

type BannerProps = {
  className?: string;
};
export function Banner({ className }: BannerProps) {
  return (
    <section role="banner" className={clsx("py-4", className)}>
      <div className="w-20 lg:w-40 mx-auto">
        <img src={content.img.src} alt={content.img.alt} />
      </div>

      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-gray-dark text-xl md:text-4xl font-semibold tracking-wider">
          {content.title}
        </h2>

        <p className="text-gray-light text-sm md:text-xl px-2 tracking-wide">
          {content.description}
        </p>
      </div>
    </section>
  );
}
