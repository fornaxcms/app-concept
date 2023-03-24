import React from "react";
import { getSession } from "next-auth/react";

import { AppLayout } from "~/layouts/AppLayout";

const ProjectTaxonomies = () => {
  return (
    <AppLayout>
      <div>ProjectTaxonomies</div>
    </AppLayout>
  );
};

export default ProjectTaxonomies;

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
