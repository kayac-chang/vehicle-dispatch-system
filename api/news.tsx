import { News } from "types";
import { get, KHH_API } from "./base";
import { parse, format } from "date-fns";
import { find, propEq, pipe } from "ramda";

const formatOnlyDate = pipe(
  (value: string) => parse(value, "yyyy-MM-dd HH:mm:ss", new Date()),
  (date) => format(date, "yyyy-MM-dd")
);

interface GetNewsResponse {
  code: 200;
  count: number;

  data: {
    newsCategoryId: string;
    newsCategoryName: "系統公告";
    title: string;
    contents: string;
    releaseDate: string;
    isTop: boolean;
    id: string;
  }[];
}

/**
 * [GET /api/Newss/Load]
 *
 * get news list from service
 */
export function getNews(): Promise<News[]> {
  return get<GetNewsResponse>(KHH_API("/api/Newss/Load")).then(({ data }) =>
    data.map(({ id, title, contents, releaseDate, newsCategoryName }) => ({
      id: id,
      title: title,
      content: contents,
      category: newsCategoryName,
      date: formatOnlyDate(releaseDate),
    }))
  );
}

/**
 * [GET /api/Newss/Load]
 *
 * get news by id from service
 */
export function getNewsByID(id: string): Promise<News | undefined> {
  return getNews().then(find<News>(propEq("id", id)));
}
