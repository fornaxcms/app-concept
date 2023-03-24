import React from "react";
import { getSession } from "next-auth/react";

import { AppLayout } from "~/layouts/AppLayout";

const ProjectGlobals = () => {
  return (
    <AppLayout>
      <div>ProjectGlobals</div>
    </AppLayout>
  );
};

export default ProjectGlobals;

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
