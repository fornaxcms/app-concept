import React from "react";
import { signIn, signOut } from "next-auth/react";

import { api } from "~/utils/api";

export const Header: React.FC = ({}) => {
  const { data: session } = api.auth.getSession.useQuery();

  return (
    <>
      <header className="w-full bg-slate-300 py-4">
        <nav className="mx-8">
          <ul className="flex items-center justify-between">
            <div>
              <li>Logo</li>
            </div>
            <div className="flex items-center space-x-8">
              <li>
                <span>
                  {session && <span>Logged in as {session?.user?.name}</span>}
                </span>
              </li>
              <li>
                <button
                  className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition"
                  onClick={session ? () => void signOut() : () => void signIn()}
                >
                  {session ? "Sign out" : "Sign in"}
                </button>
              </li>
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
};
