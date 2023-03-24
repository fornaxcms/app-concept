import React from "react";
import { getSession } from "next-auth/react";

import { AppLayout } from "~/layouts/AppLayout";

const ProjectSettings = () => {
  return (
    <AppLayout>
      <div>ProjectSettings</div>
    </AppLayout>
  );
};

export default ProjectSettings;

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
