import React from "react";
import { getProviders, signIn } from "next-auth/react";

const Login: React.FC = ({ providers }: any) => {
  return (
    <div className="flex h-screen w-full">
      <div className="flex h-full w-3/6 items-center justify-center bg-slate-300">
        <h1>Fornax CMS Concept</h1>
      </div>
      <div className="flex h-full w-3/6 flex-col items-center justify-center">
        {providers &&
          !!Object.keys(providers).length &&
          Object.values(providers).map((provider: any) => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Login;

export async function getServerSideProps(context: any) {
  return { props: { providers: await getProviders() } };
}
