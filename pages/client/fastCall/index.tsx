import Layout from "components/templates";
import { Pagination } from "components/molecules";
import { Button, Icon, NoData } from "components/atoms";
import { useState } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { DefaultModal } from "components/molecules";
import { Location, IconButton, Card } from "components/fastCall";

interface FastCallProps {
  pathNo: number;
  pathName: string;
  pickupLocation: string;
  dropLocation: string;
}

const fastCallList: FastCallProps[] = [
  {
    pathNo: 1,
    pathName: "家-亞東醫院測試用個案-名字有點長的一個個案第1組類別a",
    pickupLocation: "新北市板橋區板新路27號",
    dropLocation: "220新北市板橋區長安街331巷83號",
  },
  {
    pathNo: 2,
    pathName: "家-亞東醫院測試用個案a",
    pickupLocation: "新北市板橋區板新路27號",
    dropLocation: "220新北市板橋區長安街331巷83號",
  },
  {
    pathNo: 3,
    pathName: "家-亞東醫院測試用個案a",
    pickupLocation: "新北市板橋區板新路27號",
    dropLocation: "220新北市板橋區長安街331巷83號",
  },
  {
    pathNo: 4,
    pathName: "家-亞東醫院測試用個案a",
    pickupLocation: "新北市板橋區板新路27號",
    dropLocation: "220新北市板橋區長安街331巷83號",
  },
  {
    pathNo: 5,
    pathName: "家-亞東醫院測試用個案a",
    pickupLocation: "新北市板橋區板新路27號",
    dropLocation: "220新北市板橋區長安街331巷83號",
  },
  {
    pathNo: 6,
    pathName: "家-亞東醫院測試用個案a",
    pickupLocation: "新北市板橋區板新路27號",
    dropLocation: "220新北市板橋區長安街331巷83號",
  },
  {
    pathNo: 7,
    pathName: "家-亞東醫院測試用個案a",
    pickupLocation: "新北市板橋區板新路27號",
    dropLocation: "220新北市板橋區長安街331巷83號",
  },
  {
    pathNo: 8,
    pathName: "家-亞東醫院測試用個案a",
    pickupLocation: "新北市板橋區板新路27號",
    dropLocation: "220新北市板橋區長安街331巷83號",
  },
  {
    pathNo: 9,
    pathName: "家-亞東醫院測試用個案a",
    pickupLocation: "新北市板橋區板新路27號",
    dropLocation: "220新北市板橋區長安街331巷83號",
  },
  {
    pathNo: 10,
    pathName: "家-亞東醫院測試用個案a",
    pickupLocation: "新北市板橋區板新路27號",
    dropLocation: "220新北市板橋區長安街331巷83號",
  },
  {
    pathNo: 11,
    pathName: "家-亞東醫院測試用個案a",
    pickupLocation: "新北市板橋區板新路27號",
    dropLocation: "220新北市板橋區長安街331巷83號",
  },
];

type CardViewProps = {
  items: FastCallProps[];
};
function CardView({ items }: CardViewProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      {items.length ? (
        <div className="bg-white">
          <div className="divide-y border-b">
            {items.map(({ pathName, pickupLocation, dropLocation }, index) => (
              <Card
                key={index}
                pathName={pathName}
                pickupLocation={pickupLocation}
                dropLocation={dropLocation}
              />
            ))}
          </div>

          <div className="flex justify-center pt-8 pb-10">
            <Pagination current={6} total={10} />
          </div>
        </div>
      ) : (
        <NoData />
      )}
      <DefaultModal
        isOpen={isOpen}
        setOpen={setOpen}
        action={() => console.log("test")}
        size="lg"
      >
        <p className="px-8 opacity-75 flex items-center">
          <span className="w-6 text-orange-dark mr-4">
            <Icon.Alert />
          </span>
          <span>確定刪除此路線？</span>
        </p>
      </DefaultModal>
    </div>
  );
}

type TableViewProps = {
  items: FastCallProps[];
};
function TableView({ items }: TableViewProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="hidden lg:block pb-8">
      <table
        className={clsx(
          "w-full bg-white overflow-hidden",
          items.length ? "shadow-xl rounded-lg" : "rounded-t-lg"
        )}
      >
        <thead>
          <tr className="bg-gold-darker text-white text-left text-sm py-3">
            <th className="w-4/12 pl-4 py-3 font-medium">路線名稱</th>
            <th className="w-5/12 py-3 font-medium">起迄點</th>
            <th className="w-3/12 py-3 font-medium">操作</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {items.map(({ pathName, pickupLocation, dropLocation }, index) => (
            <tr className="font-normal text-gray-dark text-sm" key={index}>
              <td className="w-4/12 pl-4">{pathName}</td>
              <td className="w-5/12 py-3">
                <Location location={pickupLocation}>
                  <Icon.EllipseHole />
                </Location>

                <Location location={dropLocation}>
                  <Icon.EllipseFill />
                </Location>
              </td>
              <td className="w-3/12">
                <div className="w-full flex justify-center items-center space-x-1">
                  <IconButton className="text-orange-dark" title="預約訂車">
                    <Icon.Car />
                  </IconButton>

                  <hr className="border-r h-3 transform rotate-0" />

                  <IconButton className="text-blue-light" title="編輯">
                    <Icon.Edit />
                  </IconButton>

                  <hr className="border-r h-3 transform rotate-0" />

                  <IconButton className="text-red-light" title="刪除">
                    <Icon.Delete />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {items.length > 0 && (
        <div className="flex justify-end pt-2">
          <Pagination current={6} total={10} />
        </div>
      )}

      {items.length <= 0 && (
        <div className="bg-white w-full min-h-screen-1/2 flex justify-center items-center rounded-b-lg overflow-hidden shadow-xl">
          <span className="w-40 flex">
            <Icon.NoData />
          </span>
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
          <span>確定刪除此路線？</span>
        </p>
      </DefaultModal>
    </div>
  );
}

export default function FastCall() {
  return (
    <Layout.Normal title="快速叫車">
      <div className="space-y-6">
        <div className="flex justify-end">
          <div>
            <Button.Outline
              className="bg-white flex items-center px-4 py-1"
              type="button"
            >
              <span className="w-4 mr-2">
                <Icon.Plus />
              </span>
              <span className="font-semibold text-sm">新增常用路線</span>
            </Button.Outline>
          </div>
        </div>

        <div className="-mx-6 sm:m-0 space-y-4">
          <CardView items={fastCallList} />

          <TableView items={fastCallList} />
        </div>
      </div>
    </Layout.Normal>
  );
}
