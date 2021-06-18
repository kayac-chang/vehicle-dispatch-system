import { checkToken } from "apis";
import { getSession as _getSession } from "next-auth/client";

export async function getSession(props: Parameters<typeof _getSession>[0]) {
  const session = await _getSession(props);

  if (!session?.accessToken) return;

  await checkToken({ token: session.accessToken });

  return session;
}
