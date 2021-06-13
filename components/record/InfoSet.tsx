import clsx from "clsx";

type InfoSetProps = {
  title: string;
  content: string | number;
  titleSize?: "lg-sm" | "xs" | "sm";
  titleClass?: string;
  contentClass?: string;
  align?: "v" | "h" | "lg-h";
  className?: string;
};
export function InfoSet({
  title,
  content,
  titleSize = "lg-sm",
  titleClass = "text-gray-lighter",
  contentClass = "font-normal",
  align = "lg-h",
  className = "",
}: InfoSetProps) {
  return (
    <div
      className={clsx(
        "flex text-sm",
        align === "lg-h" && "flex-col lg:flex-row",
        align === "h" && "flex-row",
        align === "v" && "flex-col",
        className
      )}
    >
      <strong
        className={clsx(
          "mr-2 font-medium",
          titleSize === "lg-sm" && "text-xs lg:text-sm",
          titleSize === "xs" && "text-xs",
          titleSize === "sm" && "text-sm",
          titleClass
        )}
      >
        {title}
      </strong>

      <p className={clsx(contentClass)}>{content}</p>
    </div>
  );
}
