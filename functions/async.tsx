import { useQueries, UseQueryOptions, UseQueryResult } from "react-query";

export function wait(time: number) {
  let id: NodeJS.Timeout | undefined = undefined;

  const promise = new Promise((resolve) => {
    id = setTimeout(resolve, time);
  });

  return {
    cancel: () => id && clearTimeout(id),
    finish: promise,
  };
}

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export function useQueriesTyped<TQueries extends readonly UseQueryOptions[]>(
  queries: [...TQueries]
): {
  [ArrayElement in keyof TQueries]: UseQueryResult<
    TQueries[ArrayElement] extends { select: infer TSelect }
      ? TSelect extends (data: any) => any
        ? ReturnType<TSelect>
        : never
      : Awaited<
          ReturnType<
            NonNullable<
              Extract<TQueries[ArrayElement], UseQueryOptions>["queryFn"]
            >
          >
        >
  >;
} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQueries(
    queries as UseQueryOptions<unknown, unknown, unknown>[]
  ) as any;
}
