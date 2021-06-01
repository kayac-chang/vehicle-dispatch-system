import Layout from "components/templates";
import { Pagination } from "components/molecules";
import { Form, Icon } from "components/atoms";
import { useForm } from "react-hook-form";
import { RecordListTypes } from "types";
import { RecordCardLg, RecordCardSm } from "components/record";
import { DefaultModal } from "components/molecules";
import { useState } from "react";

const recordList: RecordListTypes[] = [
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
    orderNo: "TP16063797554258",
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
    orderNo: "TP16063797554258",
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
    orderNo: "TP16063797554258",
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
    orderNo: "TP16063797554258",
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
    orderNo: "TP16063797554258",
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
    orderNo: "TP16063797554258",
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
    orderNo: "TP16063797554258",
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
    orderNo: "TP16063797554258",
    pickUpDate: "2021-06-01 16:00",
    carType: 1,
    pickupLocation: "台灣新北市板橋區中山路一段123號",
    dropLocation: "台灣新北市板橋區自由路車站前蚵仔麵線",
  },
];

function NoData() {
  return (
    <div className="flex justify-center items-center min-h-screen-1/4">
      <div className="w-1/3 relative flex justify-center">
        <span className="w-40" aria-hidden>
          <Icon.NoData />
        </span>
        <span className="absolute bottom-0 mb-2 text-xs">暫無數據</span>
      </div>
    </div>
  );
}

type CardViewProps = {
  items: RecordListTypes[];
};
function CardView({ items }: CardViewProps) {
  return (
    <div className="block lg:hidden">
      {items.length === 0 && <NoData />}
      {items.length > 0 &&
        items.map((item, index) => <RecordCardSm item={item} key={index} />)}
    </div>
  );
}

type TableViewProps = {
  items: RecordListTypes[];
};

function TableView({ items }: TableViewProps) {
  const [isOpen, setOpen] = useState(false);
  console.log(isOpen);
  return (
    <div className="hidden lg:block pb-8">
      {items.length <= 0 && <NoData />}
      {items.length > 0 &&
        items.map((item, index) => <RecordCardLg item={item} key={index} />)}

      {items.length > 0 && (
        <div className="flex justify-end pt-2">
          <Pagination current={6} total={10} />
        </div>
      )}
      <DefaultModal
        isOpen={isOpen}
        setOpen={setOpen}
        action={() => console.log("test")}
        size="sm"
      >
        <p className="px-8 opacity-75 flex items-center">
          <span className="w-6 text-orange-dark mr-4">
            <Icon.Alert />
          </span>
          確定司機未到?
        </p>
      </DefaultModal>
    </div>
  );
}

interface Request {
  topic: string;
}

export default function Record() {
  const { control, handleSubmit } = useForm<Request>();

  function onSubmit(data: Request) {
    console.log(data);
  }

  return (
    <Layout.Normal title="訂單檢視">
      <div className="space-y-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:flex lg:justify-end"
        >
          <div className="xl:w-1/2 flex flex-col lg:flex-row gap-4">
            <div className="lg:w-1/3">
              <Form.Input
                type="select"
                name="topic"
                control={control}
                options={[
                  { id: "future", label: "未來訂單", value: "future" },
                  { id: "past", label: "過去訂單", value: "past" },
                ]}
              />
            </div>

            <div className="flex-1">
              <Form.Input type="date-range" />
            </div>
          </div>
        </form>

        <div className="-mx-6 sm:m-0 space-y-4">
          <CardView items={recordList} />

          <TableView items={recordList} />
        </div>
      </div>
    </Layout.Normal>
  );
}
