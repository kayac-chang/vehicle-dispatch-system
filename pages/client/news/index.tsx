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

    from: "開始日期",
    end: "結束日期",
    submit: "查詢",
  },
};

const INIT_PAGE = 1;
const LIMIT = 9;

function NewsQuery(page: number, category?: NewsCategory) {
  if (!category) {
    return {
      queryKey: ["news", page],
      queryFn: () => getNewsList({ limit: LIMIT, page }),
    };
  }

  return {
    queryKey: ["news", page, category],
    queryFn: () => getNewsList({ limit: LIMIT, page, category }),
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
  from: Date;
  end: Date;
}
export default function News() {
  const [page, setPage] = useState(() => INIT_PAGE);
  const { control, handleSubmit } = useForm<Request>();
  const [category, setCategory] = useState<NewsCategory>();

  const { data, isFetching } = useQuery({
    ...NewsQuery(page, category),
    keepPreviousData: true,
  });

  function onSubmit(data: Request) {
    setCategory(data.category);
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
                type="date-range"
                from={{
                  type: "date",
                  name: "from",
                  control,
                  label: content.form.from,
                  className: "bg-white",
                }}
                end={{
                  type: "date",
                  name: "end",
                  control,
                  label: content.form.end,
                  className: "bg-white",
                }}
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
