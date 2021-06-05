import { News } from "types";
import { get, KHH_API } from "./base";
import { parse, format } from "date-fns";
import { pipe, map, prop } from "ramda";

const formatOnlyDate = pipe(
  (value: string) => parse(value, "yyyy-MM-dd HH:mm:ss", new Date()),
  (date) => format(date, "yyyy-MM-dd")
);

interface BaseResponse {
  code: 200;
  count: number;
}

interface NewsResponse {
  newsCategoryId: string;
  newsCategoryName: "系統公告";
  title: string;
  contents: string;
  releaseDate: string;
  isTop: boolean;
  id: string;
}

function toNews({
  id,
  title,
  contents,
  releaseDate,
  newsCategoryName,
}: NewsResponse): News {
  return {
    id: id,
    title: title,
    content: contents,
    category: newsCategoryName,
    date: formatOnlyDate(releaseDate),
  };
}

interface GetNewsListResponse extends BaseResponse {
  data: NewsResponse[];
}

/**
 * [GET /api/Newss/Load]
 *
 * get news list from service
 */
export function getNewsList(): Promise<News[]> {
  return get<GetNewsListResponse>(KHH_API("/api/Newss/Load")).then(
    pipe(prop("data"), map(toNews))
  );
}

interface GetNewsResponse extends BaseResponse {
  result: NewsResponse;
}

/**
 * [GET /api/Newss/Get]
 *
 * get news by id from service
 */
export function getNewsByID(id: string): Promise<News | undefined> {
  return get<GetNewsResponse>(KHH_API("/api/Newss/Get", { id })).then(
    pipe(prop("result"), toNews)
  );
}
