import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import { AppLayout } from "~/layouts/AppLayout";

const Playground = dynamic<any>(
  async () => {
    const [{ store, Playground }, { Provider }] = await Promise.all([
      import("graphql-playground-react"),
      import("react-redux"),
    ]);
    return ({ ...args }) => {
      return (
        <Provider store={store}>
          <Playground {...args} />
        </Provider>
      );
    };
  },
  { ssr: false },
);

const GraphQLPage = () => {
  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Source+Code+Pro:400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AppLayout>
        <Playground endpoint="https://api.graph.cool/simple/v1/swapi" />
      </AppLayout>
    </>
  );
};

export default GraphQLPage;
