import { ReactNode } from "react";
import { Header, Footer } from "components/organisms";

type Props = {
  children?: ReactNode;
};
export default function Default({ children }: Props) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}
