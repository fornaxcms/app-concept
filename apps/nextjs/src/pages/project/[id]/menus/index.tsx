import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { api } from "~/utils/api";
import { AppLayout } from "~/layouts/AppLayout";

const ProjectMenus = () => {
  const router = useRouter();
  const projectId: string = router.query.id as string;
  const { data: menus } = api.project.getMenusInProject.useQuery(projectId);

  return (
    <AppLayout>
      <div>
        {menus?.map((menu) => (
          <Link key={menu.id} href={`/project/${projectId}/menus/${menu.id}`}>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {menu.name}
            </h3>
            <h1>{menu.description}</h1>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
};

export default ProjectMenus;

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
