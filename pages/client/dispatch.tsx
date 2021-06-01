import clsx from "clsx";
import { Button, Form, Icon } from "components/atoms";
import { Card } from "components/molecules";
import Layout from "components/templates";
import { useForm } from "react-hook-form";
import { Collapse } from "@material-ui/core";

const user = {
  name: "王小明",
};

interface Request {
  date: string;
  time: string;
  case: "options" | "default";
}

export default function News() {
  const { control } = useForm<Request>();

  return (
    <Layout.Normal title="預約訂車">
      <div className="-mx-6 sm:m-0">
        <Card>
          <Card.Header>
            <h2 className="flex-1 text-white  text-2xl font-semibold">
              {user.name}
            </h2>

            <div className="flex-1 sm:flex-none text-black">
              <Button.Base
                type="button"
                className="bg-white w-full py-1 rounded-sm shadow border-black flex items-center justify-center"
              >
                <span className="w-4">
                  <Icon.Search />
                </span>
                <span>可用補助餘額查詢</span>
              </Button.Base>
            </div>
          </Card.Header>

          <Card.Body>
            <form className="flex flex-col space-y-2">
              {/* Top */}
              <div
                className={clsx(
                  "flex flex-col space-y-6",
                  "lg:flex-row lg:space-y-0 lg:space-x-4 lg:w-1/2"
                )}
              >
                <Form.Input
                  type="date"
                  name="date"
                  control={control}
                  label="乘車日期"
                  className="flex-1"
                />

                <Form.Input
                  type="time"
                  name="time"
                  control={control}
                  label="乘車時間"
                  className="flex-1"
                />

                <Form.Input
                  type="select"
                  name="case"
                  control={control}
                  label="訂車人身份"
                  options={[
                    { id: "default", label: "本人", value: "default" },
                    { id: "options", label: "本人,家屬", value: "options" },
                  ]}
                  className="flex-1"
                />
              </div>

              {/* Select */}
              <fieldset>
                <legend className="w-full py-1 border-b-2 border-gray-600">
                  <button
                    className="flex items-center space-x-2"
                    aria-expanded
                    aria-controls="car-selection"
                  >
                    <span className="text-lg">車行選擇</span>

                    <span className="w-4 text-gold-darker">
                      <Icon.Minus />
                    </span>
                  </button>
                </legend>

                <Collapse in={true} timeout="auto" unmountOnExit>
                  <div id="car-selection"></div>
                </Collapse>
              </fieldset>
            </form>
          </Card.Body>
        </Card>
      </div>
    </Layout.Normal>
  );
}
