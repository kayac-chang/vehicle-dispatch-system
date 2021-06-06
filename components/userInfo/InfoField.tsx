import clsx from "clsx";

type InfoFieldProps = {
  className?: string;
  title: string;
  content: string;
  section?: "basic" | "case";
};
export function InfoField({
  className = "w-full",
  title,
  content,
  section = "basic",
}: InfoFieldProps) {
  return (
    <div className={clsx("text-sm font-normal", className)}>
      <strong className="text-black">{title}</strong>

      <p
        className={clsx(
          "w-full pt-3 pb-2 text-gray-dark border-b border-dashed",
          section === "basic" && "border-gold-darker",
          section === "case" && "border-orange-dark"
        )}
      >
        {content}
      </p>
    </div>
  );
}
