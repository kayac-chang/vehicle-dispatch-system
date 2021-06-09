import Layout from "components/templates";
import { Pagination, Modal } from "components/molecules";
import { Form, NoData } from "components/atoms";
import { useForm } from "react-hook-form";
import { Record as IRecord } from "types";
import { RecordCard } from "components/record";
import { useState } from "react";

const items: IRecord[] = [
  {
    status: 1,
    passenger: "王小明",
    isCarpool: true,
    ridership: 1,
    orderNo: "TP16063797554258",
    pickUpDate: "2021-06-01 16:00",
    carType: 1,
    pickupLocation: "台灣新北市板橋區中山路一段123號同吉大樓9樓8-12室",
    dropLocation:
      "台灣新北市板橋區自由路車站前蚵仔麵線旁邊的小公園第三個長板凳",
  },
  {
    status: 2,
    passenger: "王小明",
    isCarpool: false,
    ridership: 0,
    orderNo: "TP16063797554252",
    pickUpDate: "2021-06-01 16:00",
    carType: 1,
    pickupLocation: "台灣新北市板橋區中山路一段123號",
    dropLocation: "台灣新北市板橋區自由路車站前蚵仔麵線",
  },
  {
    status: 3,
    passenger: "王小明",
    isCarpool: true,
    ridership: 3,
    orderNo: "TP16063797534258",
    pickUpDate: "2021-06-01 16:00",
    carType: 1,
    pickupLocation: "台灣新北市板橋區中山路一段123號",
    dropLocation: "台灣新北市板橋區自由路車站前蚵仔麵線",
  },
  {
    status: 4,
    passenger: "王小明",
    isCarpool: false,
    ridership: 0,
    orderNo: "TP16063797544258",
    pickUpDate: "2021-06-01 16:00",
    carType: 1,
    pickupLocation: "台灣新北市板橋區中山路一段123號",
    dropLocation: "台灣新北市板橋區自由路車站前蚵仔麵線",
  },
  {
    status: 5,
    passenger: "王小明",
    isCarpool: true,
    ridership: 0,
    orderNo: "TP16023797554258",
    pickUpDate: "2021-06-01 16:00",
    carType: 1,
    pickupLocation: "台灣新北市板橋區中山路一段123號",
    dropLocation: "台灣新北市板橋區自由路車站前蚵仔麵線",
  },
  {
    status: 6,
    passenger: "王小明",
    isCarpool: false,
    ridership: 0,
    orderNo: "TP16063737554258",
    pickUpDate: "2021-06-01 16:00",
    carType: 1,
    pickupLocation: "台灣新北市板橋區中山路一段123號同吉大樓9樓8-12室",
    dropLocation: "台灣新北市板橋區自由路車站前蚵仔麵線",
  },
  {
    status: 7,
    passenger: "王小明",
    isCarpool: false,
    ridership: 0,
    orderNo: "TP16063197554258",
    pickUpDate: "2021-06-01 16:00",
    carType: 1,
    pickupLocation: "台灣新北市板橋區中山路一段123號",
    dropLocation: "台灣新北市板橋區自由路車站前蚵仔麵線",
  },
  {
    status: 8,
    passenger: "王小明",
    isCarpool: true,
    ridership: 1,
    orderNo: "TP16068797554258",
    pickUpDate: "2021-06-01 16:00",
    carType: 1,
    pickupLocation: "台灣新北市板橋區中山路一段123號",
    dropLocation: "台灣新北市板橋區自由路車站前蚵仔麵線",
  },
  {
    status: 9,
    passenger: "王小明",
    isCarpool: false,
    ridership: 0,
    orderNo: "TP06063797554258",
    pickUpDate: "2021-06-01 16:00",
    carType: 1,
    pickupLocation: "台灣新北市板橋區中山路一段123號",
    dropLocation: "台灣新北市板橋區自由路車站前蚵仔麵線",
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

interface Request {
  topic: string;
  from: Date;
  end: Date;
}
export default function Record() {
  const [modal, setModal] = useState<"absence" | "cancel" | undefined>();

  const { control, handleSubmit } = useForm<Request>();

  function onSubmit(data: Request) {
    console.log(data);
  }

  return (
    <Layout.Normal title={content.title}>
      <div className="space-y-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:flex lg:justify-end"
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
          {items.length ? (
            items.map((item) => (
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

          {items.length && (
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
