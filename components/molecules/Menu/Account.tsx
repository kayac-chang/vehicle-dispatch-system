import { Icon } from "components/atoms";
import Link from "next/link";

export function Account() {
  return (
    <>
      <div className="hidden lg:flex flex-col justify-center items-center px-8 ml-auto">
        <span>HI! 訪客</span>

        <span className="text-xxs">|</span>

        <Link href="/client/login">
          <a className="flex items-center space-x-1">
            <span className="w-4" aria-hidden>
              <Icon.Login />
            </span>

            <span>登入</span>
          </a>
        </Link>
      </div>

      <div className="lg:hidden bg-white rounded-b-3xl py-10 px-12 shadow">
        <p className="text-green-dark text-2xl font-bold">HI!訪客</p>
      </div>
    </>
  );
}
