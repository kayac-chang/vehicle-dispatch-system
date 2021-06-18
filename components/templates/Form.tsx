import { FormEvent } from "react";
import clsx from "clsx";
import { Banner } from "components/molecules";
import { BaseProps, Base } from "./Base";

type FormProps = BaseProps & {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  description?: string;
};
export function Form({ title, description, children, onSubmit }: FormProps) {
  return (
    <Base title={title} className="flex-1 md:py-36" footer={false}>
      <div
        className={clsx(
          "mx-auto flex flex-col items-center h-full",
          "md:p-8",
          "lg:flex-row lg:space-x-4",
          "xl:container"
        )}
      >
        <Banner className="lg:w-1/2" />

        <section
          className={clsx(
            "w-full h-full bg-white rounded-t-5xl shadow-2xl px-8 py-6",
            "md:h-auto md:rounded-lg md:px-12 md:py-12",
            "text-sm md:text-base",
            "space-y-4"
          )}
        >
          <div className="text-gold-darker">
            <h2 className="text-2xl md:text-4xl font-semibold">{title}</h2>

            <p>{description}</p>
          </div>

          <form onSubmit={onSubmit}>{children}</form>
        </section>
      </div>
    </Base>
  );
}
