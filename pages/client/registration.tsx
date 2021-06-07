import { Form, Button, Link } from "components/atoms";
import Layout from "components/templates";
import { useForm } from "react-hook-form";

const content = {
  title: "註冊",

  form: {
    name: "姓名",
    phone: "電話",
    birthday: "生日",
    gender: {
      label: "性別",
      options: [
        { id: "man", value: "man", label: "男" },
        { id: "woman", value: "woman", label: "女" },
      ],
    },
    identity: "身分證字號",
    easycard: "悠遊卡/一卡通卡號",

    address: {
      title: "通訊地址",
      city: {
        label: "選擇縣市",
        options: [
          {
            id: "8.01.1",
            value: "8.01.1",
            label: "Lecture 01: Powers of Ten",
          },
        ],
      },
      district: {
        label: "選擇區域",
        options: [
          {
            id: "8.01.1",
            value: "8.01.1",
            label: "Lecture 01: Powers of Ten",
          },
        ],
      },

      street: {
        label: "請輸入地址",
      },
    },

    submit: "註冊",
  },

  note: {
    label: "已有帳號？",
    link: {
      href: "/client/login",
      title: "前往登入",
      accessKey: "l",
      label: "登入",
    },
  },
};

interface Request {
  name: string;
  phone: string;
  birthday: string;
  identity: string;
  easycard: string;
  gender: "man" | "woman";
  city: string;
  district: string;
  street: string;
}

export default function Registration() {
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<Request>();

  function onSubmit(data: Request) {
    // @TODO submit logic
    console.log(data);
  }

  return (
    <Layout.Form title={content.title} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-4">
        <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-4">
          <Form.Input
            type="text"
            label={content.form.name}
            name="name"
            control={control}
            required
          />

          <Form.Input
            type="text"
            label={content.form.phone}
            name="phone"
            control={control}
            required
          />
        </div>

        <Form.Input
          type="date"
          label={content.form.birthday}
          name="birthday"
          control={control}
          required
        />

        <Form.Input
          type="radio"
          label={content.form.gender.label}
          name="gender"
          control={control}
          options={content.form.gender.options}
          required
        />

        <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-4">
          <Form.Input
            type="text"
            label={content.form.identity}
            name="identity"
            control={control}
            required
          />

          <Form.Input
            type="text"
            label={content.form.easycard}
            name="easycard"
            control={control}
          />
        </div>

        <Form.FieldSet
          className="space-y-4"
          label={content.form.address.title}
          required
        >
          <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-4">
            <Form.Input
              type="select"
              label={content.form.address.city.label}
              name="city"
              control={control}
              options={content.form.address.city.options}
            />

            <Form.Input
              type="select"
              label={content.form.address.district.label}
              name="district"
              control={control}
              options={content.form.address.district.options}
            />
          </div>

          <Form.Input
            type="text"
            name="street"
            control={control}
            label={content.form.address.street.label}
          />
        </Form.FieldSet>

        <div className="space-y-2 col-span-2">
          <Button.Flat type="submit" className="py-2">
            {content.form.submit}
          </Button.Flat>

          <div className="flex justify-end">
            <span>{content.note.label}</span>

            <Link
              href={content.note.link.href}
              title={content.note.link.title}
              accessKey={content.note.link.accessKey}
            >
              {content.note.link.label}
            </Link>
          </div>
        </div>
      </div>
    </Layout.Form>
  );
}
