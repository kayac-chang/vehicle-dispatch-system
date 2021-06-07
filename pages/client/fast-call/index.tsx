import Layout from "components/templates";
import { Pagination, Modal } from "components/molecules";
import { Button, Icon, NoData } from "components/atoms";
import clsx from "clsx";
import { Card, Table } from "components/fastCall";
import { useState } from "react";

interface Item {
  pathNo: number;
  pathName: string;
  pickupLocation: string;
  dropLocation: string;
}

const items: Item[] = [
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

const content = {
  title: "快速叫車",
  add: "新增常用路線",

  table: {
    name: "路線名稱",
    address: "起迄點",
    operation: "操作",
  },

  delete: {
    title: "刪除",
    content: "確定刪除此路線？",
    submit: "確認",
    cancel: "取消",
  },
};

type Props = {
  items: Item[];
  onOrderClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};
function CardView({ items, onOrderClick, onEditClick, onDeleteClick }: Props) {
  return (
    <div className="lg:hidden">
      {items.length ? (
        <div className="bg-white">
          <div className="divide-y border-b">
            {items.map(({ pathNo, pathName, pickupLocation, dropLocation }) => (
              <Card
                key={pathNo}
                pathNo={pathNo}
                pathName={pathName}
                pickupLocation={pickupLocation}
                dropLocation={dropLocation}
                onOrderClick={onOrderClick}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>

          <div className="flex justify-center pt-8 pb-10">
            <Pagination total={10} page={0} />
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}

function TableView({ items, onOrderClick, onEditClick, onDeleteClick }: Props) {
  return (
    <div className="hidden lg:block pb-8">
      <div
        className={clsx(
          "w-full bg-white overflow-hidden",
          items.length ? "shadow-xl rounded-lg" : "rounded-t-lg"
        )}
      >
        <div className="bg-gold-darker text-white text-sm font-medium py-4 flex">
          <p className="w-4/12 pl-4">{content.table.name}</p>
          <p className="w-5/12">{content.table.address}</p>
          <p className="w-3/12">{content.table.operation}</p>
        </div>

        <div className="divide-y">
          {items.map(({ pathNo, pathName, pickupLocation, dropLocation }) => (
            <Table
              key={pathNo}
              pathNo={pathNo}
              pathName={pathName}
              pickupLocation={pickupLocation}
              dropLocation={dropLocation}
              onOrderClick={onOrderClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </div>
      </div>

      {items.length ? (
        <div className="flex justify-end pt-2">
          <Pagination total={10} page={1} />
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default function FastCall() {
  const [modal, setModal] = useState<"delete" | undefined>();

  return (
    <Layout.Normal title={content.title}>
      <div className="space-y-6">
        <div className="flex justify-end">
          <div>
            <Button.Outline
              className="bg-white flex items-center px-4 py-1"
              type="button"
            >
              <span className="w-4 mr-2" aria-hidden>
                <Icon.Plus />
              </span>

              <span className="font-semibold text-sm">{content.add}</span>
            </Button.Outline>
          </div>
        </div>

        <div className="-mx-6 sm:m-0 space-y-4">
          <CardView items={items} onDeleteClick={() => setModal("delete")} />

          <TableView items={items} onDeleteClick={() => setModal("delete")} />
        </div>
      </div>

      {modal === "delete" && (
        <Modal.Alert
          title={content.delete.title}
          name="delete"
          label={{
            cancel: content.delete.cancel,
            submit: content.delete.submit,
          }}
          onClose={() => setModal(undefined)}
          onSubmit={() => setModal(undefined)}
        >
          <p>{content.delete.content}</p>
        </Modal.Alert>
      )}
    </Layout.Normal>
  );
}
