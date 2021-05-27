import Layout from "components/templates";
import { Pagination } from "components/molecules";
import { Form, Button } from "components/atoms";
import { useState } from "react";

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
  const [current, setCurrent] = useState(1);

  return (
    <Layout.Normal title="最新消息">
      <div className="space-y-6">
        <div className="space-y-4">
          <Form.Input
            name="topic"
            type="select"
            options={[
              { id: "all", label: "全部公告", value: "all" },
              { id: "no", label: "no", value: "no" },
            ]}
            onChange={(event) => console.log(event.target.value)}
          />

          <Form.Input
            type="date-range"
            from={{ name: "start", onChange: (event) => console.log(event) }}
            to={{ name: "end", onChange: (event) => console.log(event) }}
          />

          <Button.Flat>查詢</Button.Flat>
        </div>

        <div className="-mx-6 bg-white pb-8 space-y-4">
          <div className="divide-y shadow-lg">
            {news.map((props, index) => (
              <Card key={index} {...props} />
            ))}
          </div>

          <div className="flex justify-center">
            <Pagination current={6} total={10} />
          </div>
        </div>
      </div>
    </Layout.Normal>
  );
}
