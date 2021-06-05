import { join } from "path";

type Query = Record<string, string | number | boolean>;
export function KHH_API(path: string, query?: Query) {
  const url = new URL(join(path), process.env.KHH_API);

  query &&
    Object.entries(query).forEach(([key, value]) =>
      url.searchParams.append(key, String(value))
    );

  return new Request(url.toString());
}

function status(response: Response) {
  if (response.ok) {
    return Promise.resolve(response);
  }

  return Promise.reject(new Error(response.statusText));
}

function json(response: Response) {
  return response.json();
}

function error(err: Error) {
  console.error(err);

  return err;
}

export function get<T>(url: RequestInfo): Promise<T> {
  return fetch(url).then(status).then(json).catch(error);
}
