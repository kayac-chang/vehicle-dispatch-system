import { useState } from "react";
import clsx from "clsx";
import Layout from "components/templates";
import { Icon } from "components/atoms";
import { Accordion } from "components/molecules";

const data = [
  {
    name: `panel-1`,
    title: "在交通平台系統最早可以預約訂車期間為何?",
    description: `
        預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。?
    `,
  },
  {
    name: `panel-2`,
    title: "在交通平台系統最早可以預約訂車期間為何?1",
    description: `
        預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。?
    `,
  },
  {
    name: `panel-3`,
    title: "在交通平台系統最早可以預約訂車期間為何?2",
    description: `
        預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。?
    `,
  },
  {
    name: `panel-4`,
    title: "在交通平台系統最早可以預約訂車期間為何?3",
    description: `
        預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。?
    `,
  },
  {
    name: `panel-5`,
    title: "在交通平台系統最早可以預約訂車期間為何?4",
    description: `
        預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。?
    `,
  },
  {
    name: `panel-6`,
    title: "在交通平台系統最早可以預約訂車期間為何?5",
    description: `
        預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。?
    `,
  },
  {
    name: `panel-7`,
    title: "在交通平台系統最早可以預約訂車期間為何?6",
    description: `
        預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。?
    `,
  },
];

export default function News() {
  const [expanded, setExpanded] = useState(data[0].name);

  return (
    <Layout.Normal title="常見問題">
      <div className="-mx-6 lg:mx-0 pb-8">
        <ul>
          {data.map(({ name, title, description }) => (
            <li
              key={title}
              className={clsx(
                "border-b",
                name === expanded && "border-gold-light"
              )}
            >
              <Accordion.Normal
                name={name}
                expanded={name === expanded}
                onChange={() => setExpanded(name)}
                icon={
                  <span className="w-4 lg:w-6">
                    {name === expanded ? <Icon.Minus /> : <Icon.Plus />}
                  </span>
                }
                title={
                  <div
                    className={clsx(
                      "flex items-center space-x-2",
                      "text-sm lg:text-lg",
                      name === expanded && "text-gold-darker"
                    )}
                  >
                    <span>Q</span>

                    <h2>{title}</h2>
                  </div>
                }
              >
                <p
                  className={clsx(
                    "bg-gold-lightest px-8 py-4",
                    "text-xs lg:text-base"
                  )}
                >
                  {description}
                </p>
              </Accordion.Normal>
            </li>
          ))}
        </ul>
      </div>
    </Layout.Normal>
  );
}
