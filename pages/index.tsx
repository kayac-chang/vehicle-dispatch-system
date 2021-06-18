import Layout from "components/templates";

const content = {
  title: "首頁",
};

export default function Home() {
  return <Layout.Base title={content.title}></Layout.Base>;
}
