import React from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { api } from "~/utils/api";
import { AppLayout } from "~/layouts/AppLayout";

const ShowPage = () => {
  const router = useRouter();
  const pageId: string = router.query.pageId as string;
  const { data: page } = api.page.getPageById.useQuery(pageId);

  return (
    <AppLayout>
      <div>
        <h1>{page?.name}</h1>
      </div>
    </AppLayout>
  );
};

export default ShowPage;

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
