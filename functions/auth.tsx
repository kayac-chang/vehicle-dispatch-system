import { checkToken } from "apis";
import { Session } from "next-auth";
import { getSession as _getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useEffect } from "react";

export async function getSession(props: Parameters<typeof _getSession>[0]) {
  const session = await _getSession(props);

  if (!session?.accessToken) return;

  await checkToken({ token: session.accessToken });

  return session;
}

export function useSession() {
  const router = useRouter();
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    (async function () {
      const session = await _getSession();

      if (!session?.accessToken) return;

      checkToken({ token: session.accessToken })
        .then(() => setSession(session))
        .catch(() => router.push("/client/login"));
    })();
  }, [setSession]);

  return session;
}
