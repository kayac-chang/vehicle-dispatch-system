import Layout from "components/templates";
import { Pagination } from "components/molecules";
import { Form, Button } from "components/atoms";

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

type CardProps = {
  topic: string;
  title: string;
  date: string;
};
function Card({ topic, title, date }: CardProps) {
  return (
    <article className="px-6 py-2 space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="border border-black px-2 py-0.5">{topic}</span>

        <span>{date}</span>
      </div>

      <h3 className="text-sm">{title}</h3>
    </article>
  );
}

export default function News() {
  return (
    <Layout.Normal title="最新消息">
      <div className="space-y-6">
        <div className="lg:flex lg:justify-end">
          <div className="lg:w-1/2 flex flex-col lg:flex-row gap-4">
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

        <div className="-mx-6 lg:m-0 pb-8 space-y-4 bg-white lg:bg-transparent">
          <div className="bg-white divide-y shadow-lg">
            {news.map((props, index) => (
              <Card key={index} {...props} />
            ))}
          </div>

          <div className="flex justify-center lg:justify-end">
            <Pagination current={6} total={10} />
          </div>
        </div>
      </div>
    </Layout.Normal>
  );
}
