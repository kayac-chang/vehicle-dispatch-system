import { ReactNode } from "react";
import { Header } from "components/organisms";
import { Icon } from "components/atoms";

function Footer() {
  const items = [
    {
      icon: <Icon.Clock />,
      label: "辦公時間：週一至週五 08:00~12:00 13:30~17:30",
    },
    {
      icon: <Icon.Phone />,
      label: "總機電話：(07)713-4000",
    },
    {
      icon: <Icon.Map />,
      label: `地址：80276 高雄市苓雅區凱旋二路132-1號 1999便民服務專線(付費專線)：縣境內直撥1999，外縣市請撥(07)335-2999`,
    },
  ];

  return (
    <footer className="text-white">
      <div className="bg-green-dark p-4">
        <div className="flex mx-auto lg:divide-x">
          <div className="hidden flex-1 lg:flex justify-center items-center">
            <span className="text-xl border p-8">
              高雄市政府衛生局 版權所有
            </span>
          </div>

          <div className="flex-1 flex justify-center">
            <ul className="space-y-4 max-w-lg">
              {items.map(({ icon, label }) => (
                <li key={label} className="flex space-x-2">
                  <span className="w-6" aria-hidden>
                    {icon}
                  </span>
                  <span className="flex-1">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-copy-right p-3 flex justify-center text-sm">
        <p>COPYRIGHT © 2021 高雄市政府衛生局</p>
      </div>
    </footer>
  );
}

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
