import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { AppLayout } from "~/layouts/AppLayout";

const ProjectDashboard = () => {
  const router = useRouter();
  const id: string = router.query.id as string;
  const { data: project } = api.project.byId.useQuery(id);
  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl">
        <div>
          <h2 className="scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700">
            {project?.name}
          </h2>
          <p className="leading-7">{project?.description}</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectDashboard;
