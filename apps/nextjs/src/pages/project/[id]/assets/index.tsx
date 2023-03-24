import React from "react";
import { getSession } from "next-auth/react";

import { AppLayout } from "~/layouts/AppLayout";

const ProjectAssets = () => {
  return (
    <AppLayout>
      <div>ProjectAssets</div>
    </AppLayout>
  );
};

export default ProjectAssets;

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
