import React from "react";
import { getSession } from "next-auth/react";

import { AppLayout } from "~/layouts/AppLayout";

const ProjectSchemas = () => {
  return (
    <AppLayout>
      <div>ProjectSchemas</div>
    </AppLayout>
  );
};

export default ProjectSchemas;

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
