import { ReactNode, FormEvent } from "react";
import clsx from "clsx";
import Head from "next/head";
import { Header, Footer } from "components/organisms";
import { Background, Button } from "components/atoms";
import { Banner } from "components/molecules";
import Link from "next/link";

type BaseProps = {
  title: string;
  children?: ReactNode;
  footer?: boolean;
  className?: string;
};
export function Base({ title, children, footer = true, className }: BaseProps) {
  return (
    <>
      <Head>
        <title>高雄市政府預約訂平台 | {title}</title>
      </Head>

      <Background />

      <Header />

      <main className={clsx("flex-1", className)}>{children}</main>

      {footer && <Footer />}
    </>
  );
}

type FormProps = BaseProps & {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};
export function Form({ title, children, onSubmit }: FormProps) {
  return (
    <Base title={title} className="flex-1 md:py-36" footer={false}>
      <div
        className={clsx(
          "mx-auto flex flex-col items-center h-full",
          "md:px-8",
          "lg:flex-row lg:space-x-4",
          "xl:container"
        )}
      >
        <Banner className="lg:w-1/2" />

        <section
          className={clsx(
            "w-full h-full bg-white rounded-t-5xl shadow-2xl px-8 py-6",
            "md:h-auto md:rounded-lg md:px-12 md:py-12"
          )}
        >
          <form className="text-sm md:text-base space-y-4" onSubmit={onSubmit}>
            {children}
          </form>
        </section>
      </div>
    </Base>
  );
}

function Normal({ title, children }: BaseProps) {
  return (
    <Base title={title} footer>
      <div className="container mx-auto px-6 md:px-0">
        <div className="bg-white w-56 py-2 my-6">
          <h2 className="text-2xl font-semibold text-gold-darker tracking-wider flex justify-center border-l-8 border-green-light">
            {title}
          </h2>
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
