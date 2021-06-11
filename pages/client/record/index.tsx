import Layout from "components/templates";
import { Pagination, Modal } from "components/molecules";
import { Form, NoData } from "components/atoms";
import { useForm } from "react-hook-form";
import { RecordCard } from "components/record";
import { useState } from "react";
import { ClientRecord } from "types/record";

const mockData: ClientRecord[] = [
  {
    caseUserNo: "2",
    orderNo: "CN6800049758840336384",
    id: "6800049758777417728",
    userId: "6789314826878885888",
    caseUserId: "6789568027834228736",
    cancelReamrk: "",
    status: 1,
    reserveDate: "2021-06-18 15:15:00",
    fromAddr: "高雄市苓雅區三多四路3巷12號",
    toAddr: "807高雄市三民區明吉路13號",
    canShared: false,
    carCategoryId: "一般車",
    carCategoryName: "一般車",
    familyWith: 2,
    hasViolation: true,
    name: "阿華",
    phone: "0987654321",
    uid: "G122112739",
  },
  {
    caseUserNo: "2",
    orderNo: "CN6800048979379269649",
    id: "6800048979324739584",
    userId: "6789314826878885888",
    caseUserId: "6789568027834228736",
    cancelReamrk: "",
    status: 2,
    reserveDate: "2021-06-30 09:00:00",
    fromAddr: "高雄市苓雅區三多四路3巷12號",
    toAddr: "高雄市三民區明吉路13號",
    canShared: true,
    carCategoryId: "一般車",
    carCategoryName: "一般車",
    familyWith: 2,
    hasViolation: true,
    name: "阿華",
    phone: "0987654321",
    uid: "G122112739",
  },
  {
    caseUserNo: "2",
    orderNo: "CN6800048979379269648",
    id: "6800048979307962368",
    userId: "6789314826878885888",
    caseUserId: "6789568027834228736",
    cancelReamrk: "",
    status: 3,
    reserveDate: "2021-06-30 21:20:00",
    fromAddr: "高雄市三民區明吉路13號",
    toAddr: "高雄市苓雅區武慶三路86號",
    canShared: false,
    carCategoryId: "一般車",
    carCategoryName: "一般車",
    familyWith: 2,
    hasViolation: true,
    name: "阿華",
    phone: "0987654321",
    uid: "G122112739",
  },
  {
    caseUserNo: "3",
    orderNo: "CN6799760026935799824",
    id: "6799760026906435587",
    userId: "6789314826878885888",
    caseUserId: "6789611603716775936",
    cancelReamrk: "",
    status: 4,
    reserveDate: "2021-06-04 14:45:00",
    fromAddr: "高雄市苓雅區三多四路高雄大遠百",
    toAddr: "高雄市苓雅區高雄市苓雅區自強三路171號",
    canShared: true,
    carCategoryId: "SYS_CAR_GENERAL",
    carCategoryName: "一般車",
    familyWith: 1,
    hasViolation: true,
    name: "阿華",
    phone: "0987654321",
    uid: "G122112739",
  },
  {
    caseUserNo: "3",
    orderNo: "CN6799760026935799825",
    id: "6799760026889658368",
    userId: "6789314826878885888",
    caseUserId: "6789611603716775936",
    cancelReamrk: "",
    status: 5,
    reserveDate: "2021-06-04 14:15:00",
    fromAddr: "高雄市苓雅區高雄市苓雅區自強三路171號",
    toAddr: "高雄市苓雅區三多四路高雄大遠百",
    canShared: false,
    carCategoryId: "SYS_CAR_GENERAL",
    carCategoryName: "一般車",
    familyWith: 1,
    hasViolation: true,
    name: "阿華",
    phone: "0987654321",
    uid: "G122112739",
  },
  {
    caseUserNo: "2",
    orderNo: "CN6799064577723641856",
    id: "6799064577270652928",
    userId: "6789314826878885888",
    caseUserId: "6789568027834228736",
    cancelReamrk: "",
    status: 9,
    reserveDate: "2021-06-07 17:30:00",
    fromAddr: "高雄市仁武區八德中路49號",
    toAddr: "高雄市前鎮區鎮中路148號",
    canShared: false,
    carCategoryId: "SYS_CAR_GENERAL",
    carCategoryName: "一般車",
    familyWith: 0,
    hasViolation: true,
    name: "阿華",
    phone: "0987654321",
    uid: "G122112739",
  },
];

const content = {
  title: "訂單檢視",

  form: {
    topic: {
      label: "請選擇類別",
      options: [
        { id: "future", label: "未來訂單", value: "future" },
        { id: "past", label: "過去訂單", value: "past" },
      ],
    },

    range: {
      from: "開始時間",
      end: "結束時間",
    },
  },

  cancel: {
    title: "取消訂單",
    content: "確定取消訂單?",
  },

  absence: {
    title: "司機未到",
    content: "確定司機未到?",
  },

  button: {
    submit: "確定",
    cancel: "取消",
  },
};

const INIT_PAGE = 1;
const LIMIT = 9;

interface Request {
  topic: string;
  from: Date;
  end: Date;
}
export default function Record() {
  const [modal, setModal] = useState<"absence" | "cancel" | undefined>();

  const [page, setPage] = useState(() => INIT_PAGE);

  const { control, handleSubmit } = useForm<Request>();

  function onSubmit(data: Request) {
    console.log(data);
  }

  const data = mockData;

  return (
    <Layout.Normal title={content.title}>
      <div className="space-y-6">
        <form
          className="lg:flex lg:justify-end"
          onChange={handleSubmit(onSubmit)}
        >
          <div className="xl:w-1/2 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="lg:w-1/3">
              <Form.Input
                type="select"
                name="topic"
                control={control}
                label={content.form.topic.label}
                options={content.form.topic.options}
                className="bg-white"
              />
            </div>

            <div className="flex-1">
              <Form.Input
                type="date-range"
                from={{
                  type: "date",
                  name: "from",
                  control,
                  label: content.form.range.from,
                  className: "bg-white",
                }}
                end={{
                  type: "date",
                  name: "end",
                  control,
                  label: content.form.range.end,
                  className: "bg-white",
                }}
              />
            </div>
          </div>
        </form>

        <div className="space-y-4 pb-8">
          {data.length ? (
            data.map((item) => (
              <RecordCard
                item={item}
                key={item.orderNo}
                onAbsenceClick={() => setModal("absence")}
                onCancelClick={() => setModal("cancel")}
              />
            ))
          ) : (
            <NoData />
          )}

          {data.length && (
            <div className="flex justify-end pt-2">
              <Pagination total={10} page={0} />
            </div>
          )}
        </div>

        {modal === "cancel" && (
          <Modal.Alert
            name="cancel"
            title={content.cancel.title}
            label={{
              cancel: content.button.cancel,
              submit: content.button.submit,
            }}
            onClose={() => setModal(undefined)}
            onSubmit={() => setModal(undefined)}
          >
            <p>{content.cancel.content}</p>
          </Modal.Alert>
        )}

        {modal === "absence" && (
          <Modal.Alert
            name="absence"
            title={content.absence.title}
            label={{
              cancel: content.button.cancel,
              submit: content.button.submit,
            }}
            onClose={() => setModal(undefined)}
            onSubmit={() => setModal(undefined)}
          >
            <p>{content.absence.content}</p>
          </Modal.Alert>
        )}
      </div>
    </Layout.Normal>
  );
}
