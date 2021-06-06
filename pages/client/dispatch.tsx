import clsx from "clsx";
import { Button, Form, Icon } from "components/atoms";
import { Card, Accordion } from "components/molecules";
import Layout from "components/templates";
import { useForm, Control } from "react-hook-form";
import { CarSelection, RouteMap, JourneyTable } from "components/dispatch";
import { useState } from "react";

const user = {
  name: "王小明",
};

interface Request {
  date: string;
  time: string;
  case: "options" | "default";
  origin: string;
  "origin-note-type": string;
  "origin-note": string;
  destination: string;
  "destination-note-type": string;
  "destination-note": string;
  share: boolean;
  "is-round-trip": boolean;
  "round-trip-time": string;
  "car-type": string;
  "wheelchair-type": string;
  "accompanying-number": string;
  "sms-code": string;
}

type JourneyProps = {
  id: string;
  control: Control<Request>;
  expanded: boolean;
  setExpanded: () => void;
};
function Journey({ id, control, expanded, setExpanded }: JourneyProps) {
  return (
    <Accordion.Fieldset
      id={id}
      title="行程"
      open={expanded}
      onClick={setExpanded}
    >
      <Card.Paper className="space-y-4 -mx-4 lg:mx-0 lg:my-2">
        <div className="hidden lg:flex justify-end space-x-4">
          <Button.Base
            type="button"
            className={clsx(
              "bg-gold-darker text-white text-sm",
              "py-1 flex justify-center items-center rounded space-x-1",
              "w-28"
            )}
          >
            路線預覽
          </Button.Base>

          <Button.Base
            type="button"
            className={clsx(
              "bg-gold-darker text-white text-sm",
              "py-1 flex justify-center items-center rounded space-x-1",
              "w-28"
            )}
          >
            <span className="w-4 transform rotate-90 lg:rotate-0">
              <Icon.Swap />
            </span>

            <span>起迄點互換</span>
          </Button.Base>
        </div>

        <div className="space-y-4 lg:space-y-0 lg:flex lg:space-x-6">
          <Card.Paper className="flex-1" title="起點" icon="hole">
            <Form.Input
              type="text"
              name="origin"
              label="地址"
              control={control}
            />

            <Form.Input
              type="select"
              name="origin-note-type"
              label="起點備註"
              control={control}
              options={[{ id: "other", label: "其他", value: "other" }]}
            />

            <Form.Input
              type="text"
              name="origin-note"
              label="請輸入其他備註"
              control={control}
            />
          </Card.Paper>

          <div className="flex justify-end lg:hidden">
            <Button.Base
              type="button"
              className={clsx(
                "bg-gold-darker text-white text-sm",
                "py-1 flex justify-center items-center rounded space-x-1",
                "w-28"
              )}
            >
              <span className="w-4 transform rotate-90 lg:rotate-0">
                <Icon.Swap />
              </span>

              <span>起迄點互換</span>
            </Button.Base>
          </div>

          <Card.Paper className="flex-1" title="迄點" icon="fill">
            <Form.Input
              type="text"
              name="destination"
              label="地址"
              control={control}
            />

            <Form.Input
              type="select"
              name="destination-note-type"
              label="起點備註"
              control={control}
              options={[{ id: "other", label: "其他", value: "other" }]}
            />

            <Form.Input
              type="text"
              name="destination-note"
              label="請輸入其他備註"
              control={control}
            />
          </Card.Paper>

          <div className="flex justify-end lg:hidden">
            <Button.Base
              type="button"
              className={clsx(
                "bg-gold-darker text-white text-sm",
                "px-2 py-1 flex justify-center items-center rounded space-x-1",
                "w-28"
              )}
            >
              路線預覽
            </Button.Base>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-0 lg:flex lg:space-x-6">
          <div className="flex-1 space-y-4">
            <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0">
              <div className="lg:w-2/3 flex flex-col lg:flex-row">
                <Form.Input
                  type="check"
                  name="share"
                  control={control}
                  label="願意共乘"
                />
                <Form.Input
                  type="check"
                  name="is-round-trip"
                  control={control}
                  label="預約回程(回居住地址)"
                />
              </div>

              <div className="lg:w-1/3">
                <Form.Input
                  type="date"
                  name="round-trip-time"
                  control={control}
                  label="回程乘車時間"
                />
              </div>
            </div>

            <div className="lg:flex lg:space-x-4 space-y-4 lg:space-y-0">
              <Form.Input
                type="select"
                name="car-type"
                control={control}
                label="車種"
                options={[{ id: "car", label: "福祉車", value: "car" }]}
              />

              <Form.Input
                type="select"
                name="wheelchair-type"
                control={control}
                label="輪椅種類"
                options={[
                  { id: "normal", label: "普通輪椅(可收折)", value: "normal" },
                ]}
              />

              <Form.Input
                type="select"
                name="accompanying-number"
                control={control}
                label="陪同人數"
                options={[{ id: "0", label: "0人", value: "0" }]}
              />
            </div>

            <div className="space-y-4">
              <span>接收簡訊號碼</span>

              <Form.Input
                type="text"
                name="sms-code"
                control={control}
                label="請輸入手機號碼"
              />
            </div>

            <div className="text-xs">
              <p>註：陪同人數</p>
              <p className="text-red-light">
                第一人免費、第二人自費加價50元、第三人(含)及以上每位自費加價200元。
              </p>
            </div>
          </div>

          <div className="flex-1">
            <JourneyTable />
          </div>
        </div>
      </Card.Paper>
    </Accordion.Fieldset>
  );
}

export default function News() {
  const { control } = useForm<Request>();

  const [expanded, setExpanded] = useState("car-selection");

  return (
    <Layout.Normal title="預約訂車">
      <div className="-mx-6 sm:m-0">
        <Card.Panel
          title={
            <>
              <h2 className="flex-1 text-white  text-2xl font-semibold">
                {user.name}
              </h2>

              <div className="flex-1 sm:flex-none text-black">
                <Button.Base
                  type="button"
                  className="bg-white w-full py-1 px-2 rounded-sm shadow border-black flex items-center justify-center"
                >
                  <span className="w-4">
                    <Icon.Search />
                  </span>
                  <span>可用補助餘額查詢</span>
                </Button.Base>
              </div>
            </>
          }
        >
          <form className="flex flex-col space-y-2">
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

            <CarSelection
              id="car-selection"
              expanded={expanded === "car-selection"}
              setExpanded={() => setExpanded("car-selection")}
            />

            <Journey
              control={control}
              id="journey"
              expanded={expanded === "journey"}
              setExpanded={() => setExpanded("journey")}
            />

            <RouteMap />
          </form>
        </Card.Panel>
      </div>
    </Layout.Normal>
  );
}
