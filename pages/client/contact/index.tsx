import Layout from "components/templates";
import { Icon, Form, Button } from "components/atoms";
import { Card } from "components/contact";
import { useForm } from "react-hook-form";
import { loadJSON } from "functions/load";
import { InferGetStaticPropsType as Infer } from "next";
import { Corporation } from "types";
import { useState } from "react";

export async function getStaticProps() {
  return {
    props: {
      posts: await loadJSON<Corporation[]>("static/contact.json"),
    },
  };
}

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
type Props = Infer<typeof getStaticProps>;
export default function Contact({ posts }: Props) {
  const [keyword, setKeyword] = useState("");
  const { control, handleSubmit } = useForm<Request>();

  function search({ search }: Request) {
    setKeyword(search);
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

        <ul role="region" aria-live="polite" aria-relevant="additions removals">
          {posts
            .filter(({ name }) => name.includes(keyword))
            .map((item, index) => (
              <li key={index}>
                <Card info={item} />
              </li>
            ))}
        </ul>
      </div>
    </Layout.Normal>
  );
}
