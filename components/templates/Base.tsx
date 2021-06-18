import { ReactNode } from "react";
import clsx from "clsx";
import Head from "next/head";
import { Header, Footer } from "components/organisms";
import { Background, Loading } from "components/atoms";
import Theme from "./theme";

const content = {
  title: "高雄市政府預約訂平台",
};

export type BaseProps = {
  title: string;
  children?: ReactNode;
  footer?: boolean;
  className?: string;
  loading?: boolean;
};
export function Base({
  title,
  children,
  footer = true,
  className,
  loading,
}: BaseProps) {
  return (
    <Theme>
      <Head>
        <title>
          {content.title} | {title}
        </title>
      </Head>

      <Background />

      <Header />

      <main className={clsx("flex-1", className)}>{children}</main>

      {footer && <Footer />}

      {loading && <Loading />}
    </Theme>
  );
}
