import Layout from "components/templates";
import { Form, Button } from "components/atoms";
import { useForm } from "react-hook-form";
import { TableView, CardView } from "components/news";
import { getNewsList } from "api";
import { useQuery } from "react-query";
import { useState } from "react";
import { Query } from "functions/query";
import { NewsCategory } from "types";

const content = {
  title: "最新消息",

  form: {
    category: {
      label: "選擇類別",
      options: [
        { id: "all", label: "全部公告", value: NewsCategory.All },
        { id: "system", label: "系統訊息", value: NewsCategory.System },
        { id: "ltc", label: "長照", value: NewsCategory.LTC },
      ],
    },

    date: "請選擇時間",
    submit: "查詢",
  },
};

const INIT_PAGE = 1;
const LIMIT = 9;

function NewsQuery(page: number, category?: NewsCategory, date?: string) {
  if (category && date) {
    return {
      queryKey: ["news", page, category, date],
      queryFn: () => getNewsList({ limit: LIMIT, page, category, date }),
    };
  }

  if (date) {
    return {
      queryKey: ["news", page, date],
      queryFn: () => getNewsList({ limit: LIMIT, page, date }),
    };
  }

  if (category) {
    return {
      queryKey: ["news", page, category],
      queryFn: () => getNewsList({ limit: LIMIT, page, category }),
    };
  }

  return {
    queryKey: ["news", page],
    queryFn: () => getNewsList({ limit: LIMIT, page, date }),
  };
}

export async function getServerSideProps() {
  return {
    props: {
      ...(await Query(NewsQuery(INIT_PAGE))),
    },
  };
}

interface Request {
  category: NewsCategory;
  date: string;
}
export default function News() {
  const [page, setPage] = useState(() => INIT_PAGE);
  const { control, handleSubmit } = useForm<Request>();
  const [category, setCategory] = useState<NewsCategory>();
  const [date, setDate] = useState<string>();

  const { data, isFetching } = useQuery({
    ...NewsQuery(page, category, date),
    keepPreviousData: true,
  });

  function onSubmit({ category, date }: Request) {
    setCategory(category);

    date && setDate(date);
  }

  const news = data?.news || [];
  const max = data?.total ? Math.ceil(data.total / LIMIT) : 0;

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
                name="category"
                className="bg-white"
                control={control}
                label={content.form.category.label}
                options={content.form.category.options}
              />
            </div>

            <div className="flex-1">
              <Form.Input
                type="month"
                name="date"
                className="bg-white"
                control={control}
                label={content.form.date}
              />
            </div>

            <div className="lg:w-20">
              <Button.Flat type="submit" className="py-2">
                {content.form.submit}
              </Button.Flat>
            </div>
          </div>
        </form>

        <div className="-mx-6 sm:m-0 space-y-4">
          <CardView
            loading={isFetching}
            items={news}
            total={max}
            page={page}
            onChange={setPage}
          />

          <TableView items={news} total={max} page={page} onChange={setPage} />
        </div>
      </div>
    </Layout.Normal>
  );
}
