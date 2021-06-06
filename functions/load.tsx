import path from "path";
import { promises as fs } from "fs";
import { andThen, pipe } from "ramda";

export function loadJSON<T>(filePath: string) {
  return pipe(
    (filePath: string) => path.join(process.cwd(), filePath),
    (filePath: string) => fs.readFile(filePath, "utf-8"),
    andThen((content) => JSON.parse(content) as T)
  )(filePath);
}
