import Layout from "components/templates";
import { Pagination } from "components/molecules";
import { Form, Button, Icon } from "components/atoms";

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

function CardView() {
  return (
    <div className="bg-white divide-y shadow-lg lg:hidden">
      {news.map(({ topic, title, date }, index) => (
        <article className="px-6 py-2 space-y-2" key={index}>
          <div className="flex justify-between items-center text-xs">
            <span className="border border-black px-2 py-0.5">{topic}</span>

            <span>{date}</span>
          </div>

          <h3 className="text-sm">{title}</h3>
        </article>
      ))}
    </div>
  );
}

function TableView() {
  return (
    <table className="hidden lg:table w-full shadow-xl rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gold-darker text-white text-left">
          <th className="w-1/12 py-4 pl-4">類型</th>
          <th className="w-1/12 py-4">日期</th>
          <th className="w-9/12 py-4">公告</th>
          <th className="w-1/12 py-4"></th>
        </tr>
      </thead>

      <tbody className="divide-y">
        {news.map(({ topic, title, date }, index) => (
          <tr className="bg-white" key={index}>
            <td className="w-1/12 py-2 pl-4">{topic}</td>
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
  );
}

export default function News() {
  return (
    <Layout.Normal title="最新消息">
      <div className="space-y-6">
        <div className="lg:flex lg:justify-end">
          <div className="xl:w-1/2 flex flex-col lg:flex-row gap-4">
            <div className="lg:w-1/3">
              <Form.Input
                name="topic"
                type="select"
                options={[
                  { id: "all", label: "全部公告", value: "all" },
                  { id: "no", label: "no", value: "no" },
                ]}
                onChange={(event) => console.log(event.target.value)}
              />
            </div>

            <div className="flex-1">
              <Form.Input
                type="date-range"
                from={{
                  name: "start",
                  onChange: (event) => console.log(event),
                }}
                to={{ name: "end", onChange: (event) => console.log(event) }}
              />
            </div>

            <div className="lg:w-20">
              <Button.Flat>查詢</Button.Flat>
            </div>
          </div>
        </div>

        <div className="-mx-6 sm:m-0 pb-8 space-y-4 bg-white lg:bg-transparent">
          <CardView />

          <TableView />

          <div className="flex justify-center lg:justify-end">
            <Pagination current={6} total={10} />
          </div>
        </div>
      </div>
    </Layout.Normal>
  );
}
