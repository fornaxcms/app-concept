import React from "react";
import { getSession } from "next-auth/react";

import { AppLayout } from "~/layouts/AppLayout";

const MyProject = () => {
  return (
    <AppLayout>
      <div>MyProject</div>
    </AppLayout>
  );
};

export default MyProject;

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
