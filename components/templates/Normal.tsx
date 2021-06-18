import { BaseProps, Base } from "./Base";
import { Button } from "components/atoms";
import clsx from "clsx";

export function Normal({
  title,
  children,
  prev,
}: BaseProps & { prev?: string }) {
  return (
    <Base title={title} footer>
      <div className="container mx-auto px-6 md:px-0">
        {prev && (
          <div className="py-4 w-24">
            <Button.Outline
              className="bg-white text-gold-darker"
              type="anchor"
              href={prev}
            >
              回列表
            </Button.Outline>
          </div>
        )}

        <div className="bg-white w-56 py-1 my-6">
          <h1
            className={clsx(
              "flex justify-center",
              "border-l-8 border-green-light",
              "text-2xl font-semibold text-gold-darker tracking-wider"
            )}
          >
            {title}
          </h1>
        </div>

        {children}
      </div>
    </Base>
  );
}
