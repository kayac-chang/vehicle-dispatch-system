import { Icon, Logo } from "components/atoms";
import { Menu } from "components/molecules";
import Drawer from "@material-ui/core/Drawer";
import { useState } from "react";

const links = [
  { label: "最新消息", icon: <Icon.News />, href: "/" },
  {
    label: "預約訂車",
    icon: <Icon.Order />,
    items: [
      { label: "預約訂車", href: "/client/dispatch" },
      { label: "快速叫車", href: "/client/fast-call" },
    ],
  },
  { label: "訂單檢視", icon: <Icon.History />, href: "/client/record" },
  { label: "用戶資料", icon: <Icon.User />, href: "/client/user-info" },
  { label: "聯繫客服", icon: <Icon.Customer />, href: "/client/contact" },
  { label: "常見問題", icon: <Icon.QA />, href: "/client/qna" },
];

export function Header() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="z-10">
      <div className="shadow flex relative z-10 bg-white lg:bg-green-dark">
        <Logo />

        <Menu.Desktop items={links} />

        <button
          className="lg:hidden bg-green-dark text-white px-5 rounded-bl-3xl"
          onClick={() => setOpen(!open)}
        >
          <span className="block w-6" aria-hidden>
            <Icon.Menu />
          </span>

          <span className="sr-only">{open ? "Close Menu" : "Open Menu"}</span>
        </button>
      </div>

      <Drawer
        id="menu"
        open={open}
        anchor="top"
        style={{ zIndex: 9 }}
        className="lg:hidden"
      >
        <Menu.Mobile items={links} className="mt-10" />
      </Drawer>
    </header>
  );
}
