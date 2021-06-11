import { join } from "path";

type Query = Record<string, string | number | boolean | undefined>;
export function KHH_API(path: string, query?: Query) {
  const url = new URL("./" + join(path), process.env.NEXT_PUBLIC_KHH_API);

  query &&
    Object.entries(query)
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => url.searchParams.append(key, String(value)));
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

export function getWithToken<T>(url: RequestInfo): Promise<T> {
  return fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      "X-Token": "99d8a8fd",
    }),
  })
    .then(status)
    .then(json)
    .catch(error);
}

export function post<T>(req: RequestInfo, body: object): Promise<T> {
  const headers = new Headers();
  headers.append("accept", "text/plain");
  headers.append("Content-Type", "application/json-patch+json");

  return fetch(
    new Request(req, { method: "POST", body: JSON.stringify(body), headers })
  )
    .then(status)
    .then(json)
    .catch(error);
}
