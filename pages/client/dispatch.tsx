import clsx from "clsx";
import { Button, Form, Icon } from "components/atoms";
import { Card, Accordion } from "components/molecules";
import Layout from "components/templates";
import { Control, useForm } from "react-hook-form";
import GoogleMapReact from "google-map-react";

type CarItemProps = {
  label: string;
  order?: number;
};
function CarItem({ label, order }: CarItemProps) {
  return (
    <Button.Base
      type="button"
      className={clsx(
        order ? "bg-black bg-opacity-75 text-white" : "border border-black",
        "text-sm text-left",
        "py-2 px-8 w-full",
        "rounded relative"
      )}
    >
      <span>{label}</span>

      {order && (
        <span
          className={clsx(
            "absolute left-0 top-1/2",
            "transform -translate-y-1/2 -translate-x-1",
            "w-6 h-6",
            "flex justify-center items-center",
            "bg-yellow-dark text-black text-sm"
          )}
        >
          {order}
        </span>
      )}
    </Button.Base>
  );
}

function RouteMap() {
  const center = {
    lat: 59.95,
    lng: 30.33,
  };

  const API_KEY = "AIzaSyBd6sR-KCtS5ZYKrn6VZInAIwB1uIV0GPg";

  return (
    <div className="-mx-4">
      <div className="bg-black bg-opacity-75 flex justify-end text-xs py-3 space-x-4 px-4">
        <div className="w-1/3">
          <Button.Outline type="button" className="bg-white h-full">
            新增下個地點
          </Button.Outline>
        </div>
        <div className="w-1/3">
          <Button.Flat type="button" className="h-full py-2">
            立即預約
          </Button.Flat>
        </div>
      </div>

      <div className="h-48 w-full">
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={center}
          defaultZoom={11}
        ></GoogleMapReact>
      </div>
    </div>
  );
}

function JourneyTable() {
  const heads = [
    {
      label: "行程",
      key: "type",
      className: "text-blue-light",
    },
    {
      label: "總額",
      key: "total",
    },
    {
      label: "補助",
      key: "subsidy",
    },
    {
      label: "自負",
      key: "self",
    },
    {
      label: "陪同",
      key: "accompany",
    },
    {
      label: "個案負擔",
      key: "speical",
      className: "text-red-light",
    },
  ];

  const rows: Record<string, string>[] = [
    {
      type: "去程",
      total: "$1000",
      subsidy: "$1000",
      self: "$1000",
      accompany: "$1000",
      speical: "$1000",
    },
    {
      type: "回程",
      total: "$1000",
      subsidy: "$1000",
      self: "$1000",
      accompany: "$1000",
      speical: "$1000",
    },
  ];

  return (
    <div className="-mx-4">
      <table className="w-full bg-white table-fixed text-center text-sm">
        <thead>
          <tr className="bg-gold-darker text-white">
            {heads.map((head) => (
              <th key={head.key} className="py-2">
                {head.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y">
          {rows.map((row, index) => (
            <tr key={index}>
              {heads.map(({ key, className }) => (
                <td
                  key={`${index}, ${key}`}
                  className={clsx("py-2", className)}
                >
                  {row[key] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type JourneyProps = {
  control: Control<Request>;
};
function Journey({ control }: JourneyProps) {
  return (
    <Accordion.Fieldset id="car-selection" title="行程">
      <div className="space-y-4">
        <Card.Paper title="起點" icon="hole">
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

        <Card.Paper title="迄點" icon="fill">
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

        <div className="space-y-4">
          <div className="flex flex-col">
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

          <Form.Input
            type="date"
            name="round-trip-time"
            control={control}
            label="回程乘車時間"
          />

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
      </div>
    </Accordion.Fieldset>
  );
}

function CarSelection() {
  return (
    <Accordion.Fieldset id="car-selection" title="車行選擇">
      <div className="flex justify-between py-2">
        <p className="text-sm space-x-1">
          <span>優先搭乘車行排序</span>
          <span className="text-red-light">(請依序點擊完成排序)</span>
        </p>

        <Button.Base
          type="button"
          className="bg-gold-darker text-white text-sm px-1"
        >
          重新排序
        </Button.Base>
      </div>

      <div className="flex flex-col space-y-2">
        <CarItem
          label="新北市私立匯安老人長期照顧中心(養護型)照顧中心(養護型)"
          order={2}
        />

        <CarItem label="交通單位" />

        <CarItem
          label="新北市私立匯安老人長期照顧中心(養護型)照顧中心(養護型)"
          order={1}
        />
      </div>
    </Accordion.Fieldset>
  );
}

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

export default function News() {
  const { control } = useForm<Request>();

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
                  className="bg-white w-full py-1 rounded-sm shadow border-black flex items-center justify-center"
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

            <CarSelection />

            <Journey control={control} />

            <JourneyTable />

            <RouteMap />
          </form>
        </Card.Panel>
      </div>
    </Layout.Normal>
  );
}
