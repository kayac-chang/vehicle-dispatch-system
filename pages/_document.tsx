import Document, { Html, Head, Main, NextScript } from "next/document";

const content = {
  description: "高雄市長照交通接送統一預約服務及管理系統",
};

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-TW">
        <Head>
          <meta name="description" content={content.description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
