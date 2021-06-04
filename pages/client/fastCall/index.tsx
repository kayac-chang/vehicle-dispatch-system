import Layout from "components/templates";
import { Pagination } from "components/molecules";
import { Button, Icon, NoData } from "components/atoms";
import { useState } from "react";
import clsx from "clsx";
import { DefaultModal } from "components/molecules";
import { Location, IconButton, Card, Table } from "components/fastCall";

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
  return (
    <div className="lg:hidden">
      {items.length ? (
        <div className="bg-white">
          <div className="divide-y border-b">
            {items.map(
              ({ pathNo, pathName, pickupLocation, dropLocation }, index) => (
                <Card
                  key={index}
                  pathNo={pathNo}
                  pathName={pathName}
                  pickupLocation={pickupLocation}
                  dropLocation={dropLocation}
                />
              )
            )}
          </div>

          <div className="flex justify-center pt-8 pb-10">
            <Pagination current={6} total={10} />
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}

type TableViewProps = {
  items: FastCallProps[];
};
function TableView({ items }: TableViewProps) {
  return (
    <div className="hidden lg:block pb-8">
      <div
        className={clsx(
          "w-full bg-white overflow-hidden",
          items.length ? "shadow-xl rounded-lg" : "rounded-t-lg"
        )}
      >
        <div className="bg-gold-darker text-white text-sm font-medium py-4 flex">
          <p className="w-4/12 pl-4">路線名稱</p>
          <p className="w-5/12">起迄點</p>
          <p className="w-3/12">操作</p>
        </div>

        <div className="divide-y">
          {items.map(
            ({ pathNo, pathName, pickupLocation, dropLocation }, index) => (
              <Table
                key={index}
                pathNo={pathNo}
                pathName={pathName}
                pickupLocation={pickupLocation}
                dropLocation={dropLocation}
              />
            )
          )}
        </div>
      </div>

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
