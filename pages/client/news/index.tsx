import Layout from "components/templates";
import { Pagination } from "components/molecules";
import { Form, Button, Icon } from "components/atoms";
import { ReactNode } from "react";
import clsx from "clsx";

const news = [
  {
    topic: "長照",
    title:
      "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順",
    date: "2020-12-31",
  },
  {
    topic: "系統公告",
    title:
      "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順",
    date: "2020-12-31",
  },
  {
    topic: "系統公告",
    title:
      "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順",
    date: "2020-12-31",
  },
  {
    topic: "系統公告",
    title:
      "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順",
    date: "2020-12-31",
  },
  {
    topic: "系統公告",
    title:
      "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順",
    date: "2020-12-31",
  },
  {
    topic: "系統公告",
    title:
      "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順",
    date: "2020-12-31",
  },
  {
    topic: "系統公告",
    title:
      "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順",
    date: "2020-12-31",
  },
  {
    topic: "系統公告",
    title:
      "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順",
    date: "2020-12-31",
  },
  {
    topic: "系統公告",
    title:
      "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順",
    date: "2020-12-31",
  },
];

type TagProps = {
  children?: ReactNode;
};
function Tag({ children }: TagProps) {
  return (
    <span
      className={clsx(
        "border border-black px-2 py-0.5 text-xs",
        "border-orange-dark bg-orange-light text-orange-dark"
      )}
    >
      {children}
    </span>
  );
}

interface Post {
  topic: string;
  title: string;
  date: string;
}

type CardViewProps = {
  items: Post[];
};
function CardView({ items }: CardViewProps) {
  return (
    <div className="lg:hidden">
      {items.length ? (
        <div className="bg-white">
          <div className="divide-y">
            {news.map(({ topic, title, date }, index) => (
              <article className="px-6 py-2 space-y-2" key={index}>
                <div className="flex justify-between items-center">
                  <Tag>{topic}</Tag>

                  <span className="text-xs">{date}</span>
                </div>

                <h3 className="text-sm">{title}</h3>
              </article>
            ))}
          </div>

          <div className="flex justify-center shadow-inner pt-2 pb-6">
            <Pagination current={6} total={10} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen-1/3">
          <div className="w-1/3 relative flex justify-center">
            <span className="w-full" aria-hidden>
              <Icon.NoData />
            </span>

            <span className="absolute bottom-0 mb-2 text-xs">暫無數據</span>
          </div>
        </div>
      )}
    </div>
  );
}

type TableViewProps = {
  items: Post[];
};
function TableView({ items }: TableViewProps) {
  return (
    <div className="hidden lg:block pb-8">
      <table
        className={clsx(
          "w-full bg-white overflow-hidden",
          items.length ? "shadow-xl rounded-lg" : "rounded-t-lg"
        )}
      >
        <thead>
          <tr className="bg-gold-darker text-white text-left">
            <th className="w-1/12 py-4 pl-4">類型</th>
            <th className="w-1/12 py-4">日期</th>
            <th className="w-9/12 py-4">公告</th>
            <th className="w-1/12 py-4"></th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {items.map(({ topic, title, date }, index) => (
            <tr key={index}>
              <td className="w-1/12 py-2 pl-4">
                <Tag>{topic}</Tag>
              </td>
              <td className="w-1/12 py-2">{date}</td>
              <td className="w-9/12 py-2">{title}</td>
              <td className="w-1/12 py-2">
                <div className="w-full h-full flex justify-center">
                  <button className="w-10 p-2">
                    <Icon.ArrowRight />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {items.length > 0 && (
        <div className="flex justify-end pt-2">
          <Pagination current={6} total={10} />
        </div>
      )}

      {items.length <= 0 && (
        <div className="bg-white w-full min-h-screen-1/2 flex justify-center items-center rounded-b-lg overflow-hidden shadow-xl">
          <span className="w-40 flex">
            <Icon.NoData />
          </span>
        </div>
      )}
    </div>
  );
}

export default function News() {
  return (
    <Layout.Normal title="最新消息">
      <div className="space-y-6">
        <div className="lg:flex lg:justify-end">
          <div className="xl:w-1/2 flex flex-col lg:flex-row gap-4">
            <div className="lg:w-1/3">
              {/* <Form.Input
                name="topic"
                type="select"
                options={[
                  { id: "all", label: "全部公告", value: "all" },
                  { id: "no", label: "no", value: "no" },
                ]}
                onChange={(event) => console.log(event.target.value)}
              /> */}
            </div>

            <div className="flex-1">
              {/* <Form.Input
                type="date-range"
                from={{
                  name: "start",
                  onChange: (event) => console.log(event),
                }}
                to={{ name: "end", onChange: (event) => console.log(event) }}
              /> */}
            </div>

            <div className="lg:w-20">
              <Button.Flat type="button">查詢</Button.Flat>
            </div>
          </div>
        </div>

        <div className="-mx-6 sm:m-0 space-y-4">
          <CardView items={news} />

          <TableView items={news} />
        </div>
      </div>
    </Layout.Normal>
  );
}
