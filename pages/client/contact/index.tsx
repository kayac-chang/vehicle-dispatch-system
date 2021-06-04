import clsx from "clsx";
import Layout from "components/templates";
import { Icon } from "components/atoms";
import { CorpInfoTypes } from "types";
import { Card } from "components/contact";
import { useState } from "react";

// TODO:改成正確的資料型態及接上API
const mockCorpInfo: CorpInfoTypes[] = [
  {
    name: "凡亨國際租賃有限公司凡亨國際租賃有限公司",
    tel: "(02)2912-1966",
    operatingHours: ["(平日)08:00-18:00", "(六)08:00-18:00", "(日)08:00-18:00"],
    customerServiceHours: [
      "(一)08:00-18:00",
      "(二)08:00-18:00",
      "(三)08:00-18:00",
      "(四)08:00-18:00",
      "(五)08:00-18:00",
      "(六)08:00-18:00",
    ],
  },
  {
    name: "凡亨國際租賃有限公司凡亨國際租賃有限公司",
    tel: "(02)2912-1966",
    operatingHours: ["(平日)08:00-18:00", "(六)08:00-18:00", "(日)08:00-18:00"],
    customerServiceHours: [
      "(一)08:00-18:00",
      "(二)08:00-18:00",
      "(三)08:00-18:00",
      "(四)08:00-18:00",
      "(五)08:00-18:00",
      "(六)08:00-18:00",
      "(日)08:00-18:00",
    ],
  },
];

export default function Contact() {
  const [keyword, setKeyword] = useState("");

  const [corpList, setCorpList] = useState<CorpInfoTypes[]>(mockCorpInfo);

  function search() {
    console.log("搜尋");
  }
  return (
    <Layout.Normal title="聯繫客服">
      <div className="-mx-2 px-0 lg:mx-0 lg:px-6 pb-0 lg:pb-6">
        <div className="flex justify-end mb-6">
          <div className="w-3/5 lg:w-1/4 relative flex items-center justify-end">
            <input
              className={clsx(
                "w-full px-2 py-1 text-sm font-normal text-gray-900 bg-white",
                "border border-gray-900 placeholder-gray-900 rounded-lg"
              )}
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="請輸入車行名稱"
            />
            <button
              className="absolute mr-1 p-1 w-6 h-6 text-gray-900"
              onClick={search}
            >
              <Icon.Magnifier />
            </button>
          </div>
        </div>
        {corpList.map((item, index) => (
          <Card info={item} key={index} />
        ))}
      </div>
    </Layout.Normal>
  );
}
