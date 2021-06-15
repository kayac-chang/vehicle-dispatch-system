import clsx from "clsx";
import { Button, Form, Icon } from "components/atoms";
import { Card } from "components/molecules";
import { Control, UseFormWatch } from "react-hook-form";
import { JourneyTable, Request } from "components/dispatch";
import { endOfDay, isAfter, isSameHour, parse, set, setHours } from "date-fns";
import Rule from "functions/regexp";
import { CarType, OrderAmount } from "types";

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
        options: [
          { id: "home", label: "住家", value: "home" },
          { id: "hospital", label: "醫療院所", value: "hospital" },
          { id: "hemodialysis", label: "洗腎中心", value: "hemodialysis" },
          { id: "physiatry", label: "復健診所", value: "physiatry" },
          { id: "other", label: "其他", value: "other" },
        ],
      },
      note: "請輸入其他備註",
    },

    to: {
      title: "迄點",
      address: "地址",
      noteType: {
        label: "迄點備註",
        options: [
          { id: "home", label: "住家", value: "home" },
          { id: "hospital", label: "醫療院所", value: "hospital" },
          { id: "hemodialysis", label: "洗腎中心", value: "hemodialysis" },
          { id: "physiatry", label: "復健診所", value: "physiatry" },
          { id: "other", label: "其他", value: "other" },
        ],
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
      },

      wheelchair: {
        label: "輪椅種類",
        options: {
          normal: [
            { id: "default", label: "請選擇", value: "" },
            { id: "none", label: "無", value: "無" },
            {
              id: "normal",
              label: "普通輪椅(可收折)",
              value: "普通輪椅(可收折)",
            },
          ],

          special: [
            { id: "default", label: "請選擇", value: "" },
            { id: "normal", label: "普通輪椅", value: "普通輪椅" },
            { id: "highback", label: "高背輪椅", value: "高背輪椅" },
            { id: "electric", label: "電動輪椅", value: "電動輪椅" },
            {
              id: "electrichighback",
              label: "電動高被輪椅",
              value: "電動高被輪椅",
            },
          ],
        },
      },
      accompanying: {
        label: "陪同人數",
        options: [
          { id: "0", label: "0人", value: "0" },
          { id: "1", label: "1人", value: "1" },
          { id: "2", label: "2人", value: "2" },
          { id: "3", label: "3人", value: "3" },
          { id: "4", label: "4人", value: "4" },
          { id: "5", label: "5人", value: "5" },
          { id: "6", label: "6人", value: "6" },
          { id: "7", label: "7人", value: "7" },
        ],
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

type JourneyProps = {
  control: Control<Request>;
  watch: UseFormWatch<Request>;
  cartype: CarType[];
  amount: OrderAmount;
};
export function Journey({ control, watch, cartype, amount }: JourneyProps) {
  const time = watch("time") && parse(watch("time"), "HH:mm", new Date());
  const minBackTime = set(new Date(), { hours: 18, minutes: 15 });

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
              name="from"
              label={content.form.from.address}
              control={control}
              required
            />

            <Form.Input
              type="select"
              name="from-note-type"
              label={content.form.from.noteType.label}
              control={control}
              options={content.form.from.noteType.options}
            />

            {watch("from-note-type") === "other" && (
              <Form.Input
                type="text"
                name="from-note"
                label={content.form.from.note}
                control={control}
                required
              />
            )}
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
              name="to"
              label={content.form.to.address}
              control={control}
              required
            />

            <Form.Input
              type="select"
              name="to-note-type"
              label={content.form.to.noteType.label}
              control={control}
              options={content.form.to.noteType.options}
            />

            {watch("to-note-type") === "other" && (
              <Form.Input
                type="text"
                name="to-note"
                label={content.form.to.note}
                control={control}
                required
              />
            )}
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
            <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-2 lg:space-y-0">
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
                  disabled={
                    time
                      ? isSameHour(time, setHours(new Date(), 23))
                      : Boolean(time)
                  }
                />
              </div>

              <div className="lg:w-1/3">
                {watch("is-round-trip") && (
                  <Form.Input
                    type="time"
                    name="round-trip-time"
                    control={control}
                    label={content.form.check.time}
                    required
                    min={
                      time && isAfter(time, minBackTime) ? time : minBackTime
                    }
                    max={endOfDay(new Date())}
                  />
                )}
              </div>
            </div>

            <div className="lg:flex lg:space-x-4 space-y-4 lg:space-y-0">
              <Form.Input
                type="select"
                name="car-type"
                control={control}
                label={content.form.car.type.label}
                options={cartype.map(({ value, label }) => ({
                  id: value,
                  value,
                  label,
                }))}
              />

              <Form.Input
                type="select"
                name="wheelchair-type"
                control={control}
                label={content.form.car.wheelchair.label}
                options={
                  watch("car-type") === "SYS_CAR_WEAL"
                    ? content.form.car.wheelchair.options.special
                    : content.form.car.wheelchair.options.normal
                }
              />

              <Form.Input
                type="select"
                name="accompanying-number"
                control={control}
                label={content.form.car.accompanying.label}
                options={content.form.car.accompanying.options}
                required
              />
            </div>

            <div className="space-y-4">
              <span>{content.form.sms.title}</span>

              <Form.Input
                type="text"
                name="sms-code"
                control={control}
                label={content.form.sms.label}
                pattern={Rule.Phone}
                required
              />
            </div>

            <div className="text-xs">
              <p>{content.form.note.main}</p>
              <p className="text-red-light">{content.form.note.sub}</p>
            </div>
          </div>

          <div className="flex-1">
            <JourneyTable
              from={amount}
              to={watch("is-round-trip") ? amount : undefined}
            />
          </div>
        </div>
      </Card.Paper>
    </Form.FieldSet>
  );
}
