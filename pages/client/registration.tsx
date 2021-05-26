import { Form, Button } from "components/atoms";
import Layout from "components/templates";
import { useForm } from "react-hook-form";
import Link from "next/link";

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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Request>();

  function onSubmit(data: Request) {
    // @TODO submit logic
    console.log(data);
  }

  return (
    <Layout.Form title="註冊" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-gold-darker space-y-2 md:space-y-4">
        <h2 className="text-2xl md:text-4xl md:font-semibold">註冊</h2>
      </div>

      <div className="space-y-4 md:space-y-6">
        <Form.Input
          type="text"
          label="姓名"
          name="name"
          register={register}
          error={errors.name}
          required
        />

        <Form.Input
          type="text"
          label="電話"
          name="phone"
          register={register}
          error={errors.phone}
          required
        />

        <Form.Input
          type="text"
          label="生日"
          name="birthday"
          register={register}
          error={errors.birthday}
          required
        />

        <Form.Input
          type="radio"
          label="性別"
          name="gender"
          options={[
            { id: "man", value: "man", label: "男" },
            { id: "woman", value: "woman", label: "女" },
          ]}
          register={register}
          required
        />

        <Form.Input
          type="text"
          label="身分證字號"
          name="identity"
          register={register}
          error={errors.identity}
          required
        />

        <Form.Input
          type="text"
          label="悠遊卡/一卡通卡號"
          name="easycard"
          register={register}
        />

        <Form.FieldSet label="通訊地址" required>
          <div className="space-y-2">
            <Form.Input
              type="select"
              name="city"
              register={register}
              options={[
                {
                  id: "8.01.1",
                  value: "8.01.1",
                  label: "Lecture 01: Powers of Ten",
                },
              ]}
            />

            <Form.Input
              type="select"
              name="district"
              register={register}
              options={[
                {
                  id: "8.01.1",
                  value: "8.01.1",
                  label: "Lecture 01: Powers of Ten",
                },
              ]}
            />

            <Form.Input type="text" name="street" register={register} />
          </div>
        </Form.FieldSet>

        <div className="space-y-2">
          <Button.Flat type="submit">註冊</Button.Flat>

          <div className="flex justify-end">
            <span>已有帳號？</span>

            <Link href="/client/login">
              <a title="前往登入" access-key="l" className="text-gold-darker">
                登入
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout.Form>
  );
}
