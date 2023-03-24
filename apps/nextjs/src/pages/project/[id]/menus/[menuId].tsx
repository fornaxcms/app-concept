import React from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { api } from "~/utils/api";
import { AppLayout } from "~/layouts/AppLayout";

const ShowMenu = () => {
  const router = useRouter();
  const menuId: string = router.query.menuId as string;
  const { data: menu } = api.menu.getMenuById.useQuery(menuId);

  return (
    <AppLayout>
      <div>
        <h1>{menu?.name}</h1>
      </div>
    </AppLayout>
  );
};

export default ShowMenu;

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
