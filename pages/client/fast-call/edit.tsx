import Layout from "components/templates";
import { Card, Accordion } from "components/molecules";
import { Button, Form } from "components/atoms";
import { useForm } from "react-hook-form";

interface Request {
  name: string;
  from: string;
  end: string;
}

export default function FastCallEdit() {
  const { control } = useForm<Request>();

  return (
    <Layout.Normal title="編輯常用路線" prev="/fast-call">
      <div className="-mx-6 sm:m-0 pb-8">
        <Card.Panel
          title={
            <h2 className="flex-1 text-white  text-2xl font-semibold">
              王小明
            </h2>
          }
        >
          <form className="flex flex-col space-y-4 py-4">
            <Form.Input
              type="text"
              label="路線名稱"
              name="name"
              control={control}
            />

            <Form.FieldSet
              label="行程"
              labelClass="w-full border-b-2 border-black border-opacity-50"
            >
              <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-6 py-4">
                <Card.Paper title="起點" icon="hole" className="flex-1">
                  <Form.Input
                    type="text"
                    label="地址"
                    name="from"
                    control={control}
                  />
                </Card.Paper>

                <Card.Paper title="迄點" icon="fill" className="flex-1">
                  <Form.Input
                    type="text"
                    label="地址"
                    name="end"
                    control={control}
                  />
                </Card.Paper>
              </div>
            </Form.FieldSet>
          </form>
        </Card.Panel>

        <div className="bg-black bg-opacity-75 flex justify-end text-sm py-3 space-x-4 px-4">
          <div>
            <Button.Outline type="button" className="bg-white h-full px-4">
              取消
            </Button.Outline>
          </div>

          <div>
            <Button.Flat type="button" className="h-full py-2 px-4">
              儲存
            </Button.Flat>
          </div>
        </div>
      </div>
    </Layout.Normal>
  );
}
