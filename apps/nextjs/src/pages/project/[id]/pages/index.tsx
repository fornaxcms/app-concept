import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { api } from "~/utils/api";
import { AppLayout } from "~/layouts/AppLayout";

const ProjectPages = () => {
  const router = useRouter();
  const projectId: string = router.query.id as string;
  const { data: pages } = api.project.getPagesInProject.useQuery(projectId);

  return (
    <AppLayout>
      <div>
        {pages?.map((page) => (
          <Link key={page.id} href={`/project/${projectId}/pages/${page.id}`}>
            <div>
              <h1>{page.name}</h1>
              <h1>{page.description}</h1>
            </div>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
};

export default ProjectPages;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
}
