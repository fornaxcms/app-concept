import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import { Project } from "@acme/db";

import { api } from "~/utils/api";
import { Sidebar } from "~/components/Sidebar";
import { ProjectContext } from "~/contexts/ProjectContext";

interface AppLayoutPropsI {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutPropsI> = ({ children }) => {
  const { query } = useRouter();
  const id: string = query.id as string;
  const { data: project } = api.project.byId.useQuery(id);

  return (
    <ProjectContext.Provider value={project}>
      <div className="flex">
        <Sidebar project={project} />
        <main className="relative w-full py-6">{children}</main>
      </div>
    </ProjectContext.Provider>
  );
};
