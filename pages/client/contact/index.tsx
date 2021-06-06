import Layout from "components/templates";
import { Icon, Form, Button } from "components/atoms";
import { Corporation } from "types";
import { Card } from "components/contact";
import { useForm } from "react-hook-form";

// TODO:改成正確的資料型態及接上API
const list: Corporation[] = [
  {
    name: "凡亨國際租賃有限公司凡亨國際租賃有限公司",
    tel: "(02)2912-1966",
    description: "國定假日提前預約，皆可服務，依車行調度情況。",
    operatingHours: ["(平日)08:00-18:00", "(六)08:00-18:00", "(日)08:00-18:00"],
    customerServiceHours: [
      "(一)08:00-18:00",
      "(二)08:00-18:00",
      "(三)08:00-18:00",
      "(四)08:00-18:00",
      "(五)08:00-18:00",
      "(六)08:00-18:00",
    ],
  },
  {
    name: "凡亨國際租賃有限公司凡亨國際租賃有限公司",
    tel: "(02)2912-1966",
    description: "國定假日提前預約，皆可服務，依車行調度情況。",
    operatingHours: ["(平日)08:00-18:00", "(六)08:00-18:00", "(日)08:00-18:00"],
    customerServiceHours: [
      "(一)08:00-18:00",
      "(二)08:00-18:00",
      "(三)08:00-18:00",
      "(四)08:00-18:00",
      "(五)08:00-18:00",
      "(六)08:00-18:00",
      "(日)08:00-18:00",
    ],
  },
];

const content = {
  title: "聯繫客服",

  form: {
    search: "請輸入車行名稱",
    submit: "查詢",
  },
};

interface Request {
  search: string;
}
export default function Contact() {
  const { control, handleSubmit } = useForm<Request>();

  function search(data: Request) {
    console.log(data);
  }

  return (
    <Layout.Normal title={content.title}>
      <div className="-mx-2 lg:mx-0 space-y-4">
        <form
          className="lg:w-1/4 ml-auto flex flex-col lg:flex-row justify-end space-y-4 lg:space-y-0 lg:space-x-4"
          onSubmit={handleSubmit(search)}
        >
          <Form.Input
            type="text"
            name="search"
            control={control}
            icon={<Icon.Magnifier />}
            label={content.form.search}
            className="bg-white"
          />

          <div className="lg:w-1/3">
            <Button.Flat type="submit" className="py-1">
              {content.form.submit}
            </Button.Flat>
          </div>
        </form>

        {list.map((item, index) => (
          <Card info={item} key={index} />
        ))}
      </div>
    </Layout.Normal>
  );
}
