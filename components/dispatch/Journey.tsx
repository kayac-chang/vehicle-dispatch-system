import clsx from "clsx";
import { Button, Form, Icon } from "components/atoms";
import { Card } from "components/molecules";
import { Control } from "react-hook-form";
import { JourneyTable } from "components/dispatch";

const content = {
  title: "行程",
  preview: "路線預覽",
  swap: "起迄點互換",

  form: {
    from: {
      title: "起點",
      address: "地址",
      noteType: {
        label: "起點備註",
        options: [{ id: "other", label: "其他", value: "other" }],
      },
      note: "請輸入其他備註",
    },

    to: {
      title: "迄點",
      address: "地址",
      noteType: {
        label: "迄點備註",
        options: [{ id: "other", label: "其他", value: "other" }],
      },
      note: "請輸入其他備註",
    },

    check: {
      share: "願意共乘",
      isRoundTrip: "預約回程(回居住地址)",
      time: "回程乘車時間",
    },

    car: {
      type: {
        label: "車種",
        options: [{ id: "car", label: "福祉車", value: "car" }],
      },
      wheelchair: {
        label: "輪椅種類",
        options: [{ id: "normal", label: "普通輪椅(可收折)", value: "normal" }],
      },
      accompanying: {
        label: "陪同人數",
        options: [{ id: "0", label: "0人", value: "0" }],
      },
    },

    sms: {
      title: "接收簡訊號碼",
      label: "請輸入手機號碼",
    },

    note: {
      main: "註：陪同人數",
      sub:
        "第一人免費、第二人自費加價50元、第三人(含)及以上每位自費加價200元。",
    },
  },
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
  control: Control<Request>;
};
export function Journey({ control }: JourneyProps) {
  return (
    <Form.FieldSet
      label={content.title}
      labelClass="w-full border-b-2 border-black border-opacity-50"
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
            {content.preview}
          </Button.Base>

          <Button.Icon
            type="button"
            className={clsx(
              "bg-gold-darker text-white text-sm",
              "py-1 flex justify-center items-center rounded space-x-1",
              "w-28"
            )}
            icon={
              <span className="transform rotate-90 lg:rotate-0">
                <Icon.Swap />
              </span>
            }
          >
            {content.swap}
          </Button.Icon>
        </div>

        <div className="space-y-4 lg:space-y-0 lg:flex lg:space-x-6">
          <Card.Paper
            className="flex-1"
            title={content.form.from.title}
            icon="hole"
          >
            <Form.Input
              type="text"
              name="origin"
              label={content.form.from.address}
              control={control}
            />

            <Form.Input
              type="select"
              name="origin-note-type"
              label={content.form.from.noteType.label}
              control={control}
              options={content.form.from.noteType.options}
            />

            <Form.Input
              type="text"
              name="origin-note"
              label={content.form.from.note}
              control={control}
            />
          </Card.Paper>

          <div className="flex justify-end lg:hidden">
            <Button.Icon
              type="button"
              className={clsx(
                "bg-gold-darker text-white text-sm",
                "py-1 flex justify-center items-center rounded space-x-1",
                "w-28"
              )}
              icon={
                <span className="transform rotate-90 lg:rotate-0">
                  <Icon.Swap />
                </span>
              }
            >
              {content.swap}
            </Button.Icon>
          </div>

          <Card.Paper
            className="flex-1"
            title={content.form.to.title}
            icon="fill"
          >
            <Form.Input
              type="text"
              name="destination"
              label={content.form.to.address}
              control={control}
            />

            <Form.Input
              type="select"
              name="destination-note-type"
              label={content.form.to.noteType.label}
              control={control}
              options={content.form.to.noteType.options}
            />

            <Form.Input
              type="text"
              name="destination-note"
              label={content.form.to.note}
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
              {content.preview}
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
                  label={content.form.check.share}
                />

                <Form.Input
                  type="check"
                  name="is-round-trip"
                  control={control}
                  label={content.form.check.isRoundTrip}
                />
              </div>

              <div className="lg:w-1/3">
                <Form.Input
                  type="date"
                  name="round-trip-time"
                  control={control}
                  label={content.form.check.time}
                />
              </div>
            </div>

            <div className="lg:flex lg:space-x-4 space-y-4 lg:space-y-0">
              <Form.Input
                type="select"
                name="car-type"
                control={control}
                label={content.form.car.type.label}
                options={content.form.car.type.options}
              />

              <Form.Input
                type="select"
                name="wheelchair-type"
                control={control}
                label={content.form.car.wheelchair.label}
                options={content.form.car.wheelchair.options}
              />

              <Form.Input
                type="select"
                name="accompanying-number"
                control={control}
                label={content.form.car.accompanying.label}
                options={content.form.car.accompanying.options}
              />
            </div>

            <div className="space-y-4">
              <span>{content.form.sms.title}</span>

              <Form.Input
                type="text"
                name="sms-code"
                control={control}
                label={content.form.sms.label}
              />
            </div>

            <div className="text-xs">
              <p>{content.form.note.main}</p>
              <p className="text-red-light">{content.form.note.sub}</p>
            </div>
          </div>

          <div className="flex-1">
            <JourneyTable />
          </div>
        </div>
      </Card.Paper>
    </Form.FieldSet>
  );
}
