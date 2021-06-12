import { map } from "ramda";
import { Path } from "types";
import { getUserProfile } from "./auth";
import { KHH_API, post, get, Token, Count } from "./base";

interface FavoriteResponse {
  id: string;
  userId: string;
  userType: string;
  name: string;
  fromAddr: string;
  toAddr: string;

  createDate: string;
  createUserId: string;
  createUserName: string;

  modifyDate: string;
  modifyUserId: string;
  modifyUserName: string;
}

function toPath({ id, name, fromAddr, toAddr }: FavoriteResponse): Path {
  return { id, name, from: fromAddr, to: toAddr };
}

interface GetAllFavoriteResponse {
  count: number;
  data: FavoriteResponse[];
}

interface GetNewsListQuery {
  limit: number;
  page: number;
}
export function getAllFavorites({
  token,
  limit,
  page,
}: Partial<GetNewsListQuery> & Token): Promise<Count<Path>> {
  return get<GetAllFavoriteResponse>(
    KHH_API("UserFavorite/Load", { limit, page }),
    {
      "X-Token": token,
    }
  ).then(({ count, data }) => ({
    total: Number(count),
    items: map(toPath, data),
  }));
}

interface Favorite {
  name: string;
  from: string;
  to: string;
}

export async function addFavorite({
  token,
  name,
  from,
  to,
}: Favorite & Token): Promise<boolean> {
  const user = await getUserProfile({ token });

  return post(
    KHH_API("UserFavorite/Add"),
    {
      id: user.id,
      userId: user.uid,
      userType: "caseuser",
      name,
      fromAddr: from,
      toAddr: to,

      createDate: new Date().toISOString(),
      createUserId: user.uid,
      createUserName: user.name,

      modifyDate: new Date().toISOString(),
      modifyUserId: user.uid,
      modifyUserName: user.name,
    },
    {
      "X-Token": token,
    }
  ).then(() => true);
}
