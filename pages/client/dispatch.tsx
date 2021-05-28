import { Form, Icon } from "components/atoms";
import { Card } from "components/molecules";
import Layout from "components/templates";

const user = {
  name: "王小明",
};

export default function News() {
  return (
    <Layout.Normal title="預約訂車">
      <div className="-mx-6 sm:m-0">
        <Card>
          <Card.Header>
            <h2 className="flex-1 text-white  text-2xl font-semibold">
              {user.name}
            </h2>

            <div className="flex-1 sm:flex-none text-black">
              <Form.Input
                type="text"
                name="search"
                className="py-1 pl-8"
                placeholder="可用補助餘額查詢"
                icon={<Icon.Search />}
              />
            </div>
          </Card.Header>

          <Card.Body>
            <form className="flex flex-col space-y-2">
              <Form.Input type="date" name="date" label="乘車日期" />
              <Form.Input type="time" name="time" label="乘車時間" />
            </form>
          </Card.Body>
        </Card>
      </div>
    </Layout.Normal>
  );
}
