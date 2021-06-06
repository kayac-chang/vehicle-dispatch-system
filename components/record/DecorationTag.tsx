import clsx from "clsx";
type DecorationTagProps = {
  className?: string;
  label: string;
};
export function DecorationTag({ className, label }: DecorationTagProps) {
  return (
    <div className={className}>
      <div
        className={clsx(
          "w-48 lg:w-64 h-8 flex justify-center items-center bg-orange-dark relative overflow-hidden"
        )}
      >
        <div
          className="absolute right-0 w-5 h-8"
          style={{ background: "#FF9800" }}
        />

        <div
          className={clsx("absolute w-2 h-12 transform rotate-12 bg-white")}
          style={{ right: "1rem" }}
        />

        <div
          className={clsx("absolute w-2 h-10 transform rotate-12 bg-white")}
          style={{ right: "-0.2rem" }}
        />

        <hr className="w-full border border-white border-t-0 opacity-50" />

        <div className="absolute w-12 h-6 bg-orange-dark -ml-5"></div>

        <p className="absolute text-white -ml-5">。{label}。</p>
      </div>
    </div>
  );
}
