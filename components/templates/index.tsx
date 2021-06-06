import { ReactNode, FormEvent } from "react";
import clsx from "clsx";
import Head from "next/head";
import { Header, Footer } from "components/organisms";
import { Background, Button } from "components/atoms";
import { Banner } from "components/molecules";
import Theme from "./theme";

type BaseProps = {
  title: string;
  children?: ReactNode;
  footer?: boolean;
  className?: string;
};
export function Base({ title, children, footer = true, className }: BaseProps) {
  return (
    <Theme>
      <Head>
        <title>高雄市政府預約訂平台 | {title}</title>
      </Head>

      <Background />

      <Header />

      <main className={clsx("flex-1", className)}>{children}</main>

      {footer && <Footer />}
    </Theme>
  );
}

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

function Normal({ title, children, prev }: BaseProps & { prev?: string }) {
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
          <h1 className="text-2xl font-semibold text-gold-darker tracking-wider flex justify-center border-l-8 border-green-light">
            {title}
          </h1>
        </div>

        {children}
      </div>
    </Base>
  );
}

function Sub({ title, children, prev }: BaseProps & { prev: string }) {
  return (
    <Base title={title} footer>
      <div className="container mx-auto py-4 px-6 md:px-0">
        <div className="py-4 w-24">
          <Button.Outline
            className="bg-white text-gold-darker"
            type="anchor"
            href={prev}
          >
            回列表
          </Button.Outline>
        </div>

        {children}
      </div>
    </Base>
  );
}

const Layout = {
  Base,
  Form,
  Normal,
  Sub,
};
export default Layout;
