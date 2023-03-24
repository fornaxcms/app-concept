import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { api } from "~/utils/api";
import { AppLayout } from "~/layouts/AppLayout";
import CreateCollectionModal from "~/modules/collections/CreateCollectionModal";

const ProjectCollections = () => {
  const router = useRouter();
  const projectId: string = router.query.id as string;
  const { data: collections } =
    api.project.getCollectionsInProject.useQuery(projectId);

  return (
    <AppLayout>
      <div>
        <div className="mx-auto flex w-full max-w-[85rem] items-center justify-between border-b-2 border-b-slate-300 py-4">
          <div>
            <h1>Collections</h1>
          </div>
          <div>
            <CreateCollectionModal projectId={projectId} />
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-[85rem] space-y-4">
          <div className="space-y-4">
            {collections?.map((collection) => (
              <div>
                <Link
                  key={collection.id}
                  href={`/project/${projectId}/collections/${collection.id}`}
                  className="hover:text-blue-400"
                >
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    {collection.name}
                  </h3>
                  <h1>{collection.description}</h1>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectCollections;

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
