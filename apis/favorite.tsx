import { map, prop } from "ramda";
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

interface GetAllFavoritesQuery {
  limit: number;
  page: number;
}
export function getAllFavorites({
  token,
  limit,
  page,
}: Partial<GetAllFavoritesQuery> & Token): Promise<Count<Path>> {
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

interface GetFavoriteResponse {
  result: FavoriteResponse;
}

export function getFavorite({
  token,
  id,
}: Token & { id: string }): Promise<Path> {
  return get<GetFavoriteResponse>(KHH_API("UserFavorite/Get", { id }), {
    "X-Token": token,
  })
    .then(prop("result"))
    .then(toPath);
}

interface Favorite {
  id?: string;
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
      userId: user.id,
      userType: "SYS_USERCATEGORY_CASEUSER",
      name,
      fromAddr: from,
      toAddr: to,
    },
    {
      "X-Token": token,
    }
  ).then(() => true);
}

export async function updateFavorite({
  token,
  id,
  name,
  from,
  to,
}: Required<Favorite> & Token): Promise<boolean> {
  const user = await getUserProfile({ token });

  return post(
    KHH_API("UserFavorite/Update"),
    {
      id,
      userId: user.id,
      userType: "SYS_USERCATEGORY_CASEUSER",
      name,
      fromAddr: from,
      toAddr: to,
    },
    {
      "X-Token": token,
    }
  ).then(() => true);
}

export async function deleteFavorite({
  token,
  items,
}: Token & { items: string[] }): Promise<boolean> {
  return post(KHH_API("UserFavorite/Delete"), items, {
    "X-Token": token,
  }).then(() => true);
}
