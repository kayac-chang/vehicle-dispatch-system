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
        <header className="bg-none lg:bg-green-dark">
          <div className="shadow flex relative z-10">
            <Logo />

            <div className="flex-1">
              <nav
                className="flex flex-col py-8"
                aria-label="Navigation Dropdown"
                role="navigation"
              ></nav>
            </div>

            <Menu.Button open={open} />
          </div>

          <Menu.Panel items={links} />
        </header>
      )}
    </Disclosure>
  );
}
