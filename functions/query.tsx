import { QueryClient, QueryOptions } from "react-query";
import { dehydrate } from "react-query/hydration";

export async function Query(option: QueryOptions) {
  const client = new QueryClient();

  await client.prefetchQuery(option);

  return { dehydratedState: dehydrate(client) };
}
