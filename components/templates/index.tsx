import { ReactNode } from "react";
import clsx from "clsx";
import Head from "next/head";
import { Header, Footer } from "components/organisms";
import { Background } from "components/atoms";
import { Banner } from "components/molecules";

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

      <main className={className}>{children}</main>

      {footer && <Footer />}
    </>
  );
}

type FormProps = {
  title: string;
  children?: ReactNode;
};
export function Form({ title, children }: FormProps) {
  return (
    <Base title={title} className="flex-1 md:py-40" footer={false}>
      <div className="xl:container mx-auto flex flex-col lg:flex-row items-center h-full space-x-4 px-8">
        <Banner className="lg:w-1/2" />

        <section className="w-full h-full bg-white rounded-t-5xl md:rounded-lg shadow-2xl">
          {children}
        </section>
      </div>
    </Base>
  );
}

const Layout = {
  Base,
  Form,
};
export default Layout;
