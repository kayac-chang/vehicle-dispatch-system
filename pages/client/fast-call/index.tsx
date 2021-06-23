import Layout from "components/templates";
import { Pagination, Modal } from "components/molecules";
import { Button, Icon, NoData } from "components/atoms";
import clsx from "clsx";
import { Card, Table } from "components/fastCall";
import { useState } from "react";
import { Path } from "types";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession } from "functions/auth";
import { deleteFavorite, getAllFavorites } from "apis";
import { Query } from "functions/query";
import { useQuery } from "react-query";

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

type PathProps = {
  loading: boolean;
  items?: Path[];
  total: number;
  page: number;
  onChange: (page: number) => void;
  onDeleteClick?: (id: string) => void;
};
function CardView({
  loading,
  items = [],
  total,
  page,
  onChange,
  onDeleteClick,
}: PathProps) {
  return (
    <div className="lg:hidden">
      {items.length ? (
        <div className="bg-white">
          <ul
            className="divide-y border-b"
            aria-live="polite"
            aria-busy={loading ? "true" : "false"}
          >
            {items.map(({ id, name, from, to }) => (
              <li key={id}>
                <Card
                  id={id}
                  name={name}
                  from={from}
                  to={to}
                  onDeleteClick={() => onDeleteClick?.(id)}
                />
              </li>
            ))}
          </ul>

          <div className="flex justify-center pt-8 pb-10">
            <Pagination total={total} page={page} onChange={onChange} />
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}

function TableView({
  loading,
  items = [],
  total,
  page,
  onChange,
  onDeleteClick,
}: PathProps) {
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

        <ul
          className="divide-y divide-gray-extralight"
          aria-live="polite"
          aria-busy={loading ? "true" : "false"}
        >
          {items.map(({ id, name, from, to }) => (
            <li key={id}>
              <Table
                id={id}
                name={name}
                from={from}
                to={to}
                onDeleteClick={() => onDeleteClick?.(id)}
              />
            </li>
          ))}
        </ul>
      </div>

      {items.length ? (
        <div className="flex justify-end pt-2">
          <Pagination total={total} page={page} onChange={onChange} />
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}

const INIT_PAGE = 1;
const LIMIT = 10;

function FavoriteQuery(token: string, page: number) {
  return {
    queryKey: ["favorites", token, page],
    queryFn: () => getAllFavorites({ token, limit: LIMIT, page }),
  };
}

type Context = GetServerSidePropsContext<{ id: string }>;
export async function getServerSideProps({ req, resolvedUrl }: Context) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/client/login?from=${resolvedUrl}`,
        permanent: true,
      },
      props: {},
    };
  }

  const { dehydratedState } = await Query(
    FavoriteQuery(session.accessToken, INIT_PAGE)
  );

  return {
    props: {
      dehydratedState,
      token: session.accessToken,
    },
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function FastCall({ token }: Props) {
  const [page, setPage] = useState(() => INIT_PAGE);
  const { data, isFetching, refetch } = useQuery({
    ...FavoriteQuery(token!, INIT_PAGE),
    keepPreviousData: true,
    enabled: Boolean(token),
  });

  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
    undefined
  );
  const favorites = data?.items || [];
  const max = data?.total ? Math.ceil(data.total / LIMIT) : 0;

  return (
    <Layout.Normal title={content.title}>
      <div className="space-y-6">
        <div className="flex justify-end">
          <div>
            <Button.Outline
              className="bg-white flex items-center px-4 py-1"
              type="anchor"
              href="/client/fast-call/add"
            >
              <span className="w-4 mr-2" aria-hidden>
                <Icon.Plus />
              </span>

              <span className="font-semibold text-sm">{content.add}</span>
            </Button.Outline>
          </div>
        </div>

        <div className="-mx-6 sm:m-0 space-y-4">
          <CardView
            loading={isFetching}
            items={favorites}
            onDeleteClick={setDeleteTarget}
            total={max}
            page={page}
            onChange={setPage}
          />

          <TableView
            loading={isFetching}
            items={favorites}
            onDeleteClick={setDeleteTarget}
            total={max}
            page={page}
            onChange={setPage}
          />
        </div>
      </div>

      {deleteTarget && (
        <Modal.Alert
          title={content.delete.title}
          name="delete"
          label={{
            cancel: content.delete.cancel,
            submit: content.delete.submit,
          }}
          onClose={() => setDeleteTarget(undefined)}
          onSubmit={() => {
            if (!token) return;

            deleteFavorite({ token, items: [deleteTarget] })
              .then(() => refetch())
              .then(() => setDeleteTarget(undefined));
          }}
        >
          <p>{content.delete.content}</p>
        </Modal.Alert>
      )}
    </Layout.Normal>
  );
}
