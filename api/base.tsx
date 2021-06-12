import { join } from "path";

export interface Token {
  token: string;
}

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
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return Promise.resolve(response);
}

function json(response: Response) {
  return response.json().then((body) => {
    if (body.code === 500) {
      throw new Error(body.message);
    }

    return Promise.resolve(body);
  });
}

function error(err: Error) {
  console.error(err);

  return err;
}

export function get<T>(req: RequestInfo, headers = {}): Promise<T> {
  return fetch(
    new Request(req, {
      headers: new Headers(headers),
    })
  )
    .then(status)
    .then(json)
    .catch(error);
}

export function post<T>(
  req: RequestInfo,
  body: object,
  headers = {}
): Promise<T> {
  return fetch(
    new Request(req, {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        accept: "text/plain",
        "Content-Type": "application/json-patch+json",
        ...headers,
      }),
    })
  )
    .then(status)
    .then(json)
    .catch(error);
}
