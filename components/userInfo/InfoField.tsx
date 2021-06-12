import clsx from "clsx";

type InfoFieldProps = {
  className?: string;
  title: string;
  content: string;
};
export function InfoField({
  className = "w-full",
  title,
  content,
}: InfoFieldProps) {
  return (
    <div className={clsx("text-sm font-normal", className)}>
      <strong className="text-black">{title}</strong>

      <p
        className={clsx(
          "w-full min-h-10 pt-3 pb-2 text-gray-dark border-b border-dashed border-gold-darker"
        )}
      >
        {content}
      </p>
    </div>
  );
}
