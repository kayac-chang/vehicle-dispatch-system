import { getUserProfile } from "./auth";
import { KHH_API, post, Token } from "./base";

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
}: Favorite & Token): Promise<string> {
  const user = await getUserProfile({ token });

  return post(
    KHH_API("UserFavorite/Add"),
    {
      id: user.id,
      userId: user.uid,
      userType: "SYS_USERCATEGORY_CASEUSER",
      name,
      fromAddr: from,
      toAddr: to,

      // not sure
      district: null,
      lineStationName: null,
      lineStationId: null,

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
  );
}
