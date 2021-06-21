import { checkToken } from "apis";
import { Session } from "next-auth";
import { getSession as _getSession, signOut } from "next-auth/client";
import { useState } from "react";
import { useEffect } from "react";

export async function getSession(props: Parameters<typeof _getSession>[0]) {
  const session = await _getSession(props);

  if (!session?.accessToken) return;

  try {
    await checkToken({ token: session.accessToken });
  } catch (err) {
    return;
  }

  return session;
}

export function useSession() {
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    (async function () {
      const session = await _getSession();

      if (!session?.accessToken) return;

      checkToken({ token: session.accessToken })
        .then(() => setSession(session))
        .catch(() => signOut());
    })();
  }, [setSession]);

  return session;
}
