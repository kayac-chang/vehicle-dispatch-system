import { ReactNode } from "react";
import { Header } from "../organisms";

type Props = {
  children?: ReactNode;
};
export default function Default({ children }: Props) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <footer></footer>
    </>
  );
}
