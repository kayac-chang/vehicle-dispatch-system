import { getUserProfile } from "apis";
import { Icon, Link } from "components/atoms";
import { useSession } from "functions/auth";
import { signOut } from "next-auth/client";
import { useState } from "react";
import { useEffect } from "react";

export function Account() {
  const session = useSession();
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    if (!session?.accessToken) return;

    getUserProfile({ token: session.accessToken }).then(({ name }) =>
      setUsername(name)
    );
  }, [session?.accessToken, setUsername]);

  return (
    <>
      <div className="hidden lg:flex flex-col justify-center items-center px-8 ml-auto">
        <span>{username ? `HI! ${username}` : `HI! 訪客`}</span>

        <span className="text-xxs">|</span>

        {username ? (
          <button
            className="flex items-center space-x-1"
            onClick={() => signOut()}
          >
            <span className="w-4" aria-hidden>
              <Icon.Login />
            </span>

            <span>登出</span>
          </button>
        ) : (
          <Link href="/client/login" className="flex items-center space-x-1">
            <span className="w-4" aria-hidden>
              <Icon.Login />
            </span>

            <span>登入</span>
          </Link>
        )}
      </div>

      <div className="lg:hidden bg-white rounded-b-3xl py-10 px-12 shadow space-y-4">
        <p className="text-green-dark text-2xl font-bold">
          {username ? `HI! ${username}` : `HI! 訪客`}
        </p>

        {username && (
          <button
            className="rounded-full bg-gold-dark text-white px-8 py-1"
            onClick={() => signOut()}
          >
            登出
          </button>
        )}
      </div>
    </>
  );
}
