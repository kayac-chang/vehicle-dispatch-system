import Layout from "components/templates";
import { Form, Button } from "components/atoms";

export default function News() {
  return (
    <Layout.Normal title="最新消息">
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
    </Layout.Normal>
  );
}
