import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Project } from "@acme/db";

import { api } from "~/utils/api";

interface SidebarPropsI {
  project: Project | null | undefined;
}

export const Sidebar: React.FC<SidebarPropsI> = ({ project }) => {
  const { data: session } = api.auth.getSession.useQuery();
  return (
    <div className="relative min-h-screen w-56 bg-slate-200">
      <nav className="mx-6 flex h-full flex-col items-center justify-between py-6">
        <div>
          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              <Link href={`/project/${project?.id}`}>{project?.name}</Link>
            </h3>
          </div>
          <div>
            <ul className="mt-14">
              <div className="space-y-4">
                <li>
                  <Link href={`/project/${project?.id}/collections`}>
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href={`/project/${project?.id}/pages`}>Pages</Link>
                </li>
                <li>
                  <Link href={`/project/${project?.id}/menus`}>Menus</Link>
                </li>
                <li>
                  <Link href={`/project/${project?.id}/taxonomies`}>
                    Taxonomies
                  </Link>
                </li>
                <li>
                  <Link href={`/project/${project?.id}/globals`}>Globals</Link>
                </li>
                <li>
                  <Link href={`/project/${project?.id}/assets`}>Assets</Link>
                </li>
                <li>
                  <Link href={`/project/${project?.id}/schemas`}>Schemas</Link>
                </li>
                <li>
                  <Link href={`/project/${project?.id}/graphql`}>
                    API Playground
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div>
          <ul className="flex flex-col items-center space-y-3">
            <div className="mb-4 space-y-2">
              <li>
                <Link href={`/project/${project?.id}/my-project`}>
                  My Project
                </Link>
              </li>
              <li>
                <Link href={`/project/${project?.id}/settings`}>Settings</Link>
              </li>
            </div>
            <li>
              <span>{session && <span>{session?.user?.name}</span>}</span>
            </li>
            <li>
              <button
                className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition"
                onClick={() => void signOut()}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
