import React from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { api } from "~/utils/api";
import { AppLayout } from "~/layouts/AppLayout";

const ShowCollection = () => {
  const router = useRouter();
  const collectionId: string = router.query.collectionId as string;
  const { data: collection } =
    api.collection.getCollectionById.useQuery(collectionId);

  return (
    <AppLayout>
      <div>
        <h1>{collection?.name}</h1>
        {/* <span>{collection?.description}</span> */}

        <h1 className="mt-4">Models</h1>
        {collection?.models.map((model) => (
          <div key={model.id}>
            <h2>{model.name}</h2>
            <div>
              {model.fields.map((field) => (
                <div key={field.id} className="flex space-x-4">
                  <h3>{field.name}</h3>
                  <span>{field.type}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default ShowCollection;

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
