import { News, NewsCategory } from "types";
import { get, KHH_API, Count } from "./base";
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

interface GetNewsListQuery {
  limit: number;
  page: number;
  category: NewsCategory.System | NewsCategory.LTC;
  date: string;
}

/**
 * [GET /api/Newss/Load]
 *
 * get news list from service
 */
export function getNewsList(
  props: Partial<GetNewsListQuery> | undefined
): Promise<Count<News>> {
  return get<GetNewsListResponse>(
    KHH_API("Newss/Load", {
      isClient: true,
      limit: props?.limit,
      page: props?.page,
      NewsCategoryId: props?.category,
      ReleaseDate: props?.date,
      orderby: "ReleaseDate",
    })
  ).then(({ data, count }) => ({
    total: Number(count),
    items: map(toNews, data),
  }));
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
  return get<GetNewsResponse>(KHH_API("Newss/Get", { id })).then(
    pipe(prop("result"), toNews)
  );
}
