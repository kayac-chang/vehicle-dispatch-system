import { Icon, Logo } from "components/atoms";
import { Disclosure } from "@headlessui/react";
import { Menu } from "components/molecules";

const links = [
  { label: "最新消息", icon: <Icon.News />, href: "/" },
  {
    label: "預約訂車",
    icon: <Icon.Order />,
    items: [
      { label: "預約訂車", href: "/" },
      { label: "快速叫車", href: "/" },
    ],
  },
  { label: "訂單檢視", icon: <Icon.History />, href: "/" },
  { label: "用戶資料", icon: <Icon.User />, href: "/" },
  { label: "聯繫客服", icon: <Icon.Customer />, href: "/" },
  { label: "常見問題", icon: <Icon.QA />, href: "/" },
];

export function Header() {
  return (
    <Disclosure>
      {({ open }) => (
        <header>
          <div className="shadow flex relative z-10 bg-white lg:bg-green-dark">
            <Logo />

            <Menu.Desktop items={links} />

            <Menu.Button open={open} />
          </div>

          <Menu.Mobile items={links} />
        </header>
      )}
    </Disclosure>
  );
}
