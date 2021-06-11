import { getNewsByID } from "api";
import Layout from "components/templates";
import ReactMarkdown from "react-markdown";
import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import rehypeRaw from "rehype-raw";

type Context = GetStaticPropsContext<{ id: string }>;
export async function getServerSideProps({ params }: Context) {
  if (!params) {
    return {
      redirect: {
        destination: "/client/news",
        permanent: true,
      },
      props: {
        news: undefined,
      },
    };
  }

  const news = await getNewsByID(params.id);

  if (!news) {
    return {
      notFound: true,
      props: {
        news: undefined,
      },
    };
  }

  return {
    props: {
      news,
    },
  };
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function News({ news }: Props) {
  if (!news) return <></>;

  return (
    <Layout.Sub title={news.title} prev="/client/news">
      <article className="space-y-4 pb-8">
        <h1 className="text-blue-dark text-xl font-semibold">{news.title}</h1>

        <ReactMarkdown
          className="space-y-4 p-8 bg-white rounded-lg shadow-lg"
          rehypePlugins={[rehypeRaw]}
        >
          {news.content}
        </ReactMarkdown>
      </article>
    </Layout.Sub>
  );
}
