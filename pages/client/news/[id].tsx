import Layout from "components/templates";
import ReactMarkdown from "react-markdown";

const news = {
  title: "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序。",
  content: `
  系統更新完畢後，部分使用者之網頁及APP可能因暫存檔導致網頁無法正常讀取，若有無法操作情形，煩請參照以下步驟排除。

  網頁清除快取步驟
  
  - 快捷鍵-「Ctrl＋Shift＋R」
  - 於網頁上按右鍵->點選「檢查」->於網址列的重整按鈕上按右鍵->點選「清除快取並強制重新載入」
  
  APP清除快取步驟
  
  - ios版本：設定->safari->清除瀏覽紀錄和網站資料
  
  - Android 版本：設定->應用程式->點選長照交通預約系統APP->儲存空間->清除快取
  `,
};

export default function News() {
  return (
    <Layout.Sub title={news.title} prev="/client/news">
      <article className="space-y-4 pb-8">
        <h1 className="text-blue-dark text-xl font-semibold">{news.title}</h1>

        <ReactMarkdown className="space-y-4 p-8 bg-white rounded-lg shadow-lg">
          {news.content}
        </ReactMarkdown>
      </article>
    </Layout.Sub>
  );
}
