import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "e/utils/api";

export default function Home() {

  return (
    <div>

      <Head>
        <title>e</title>
      </Head>
      
      <div className="flex flex-auto flex-col">
        <div className="flex flex-auto justify-center">
          <h1 className="text-9xl m-11">e</h1>
        </div>

        <div className="flex flex-auto justify-center">
          <h1 className="text-5xl m-11">LLM powered surveys</h1>
        </div>

        <div className="flex flex-auto justify-center flex-row space-x-28 relative inset-y-44">
          <div className="flex bg-gray-600 h-14 w-32 text-l text-center rounded-lg">
            <span className="m-auto">Get Started</span>
          </div>
          <div className="flex bg-gray-600 h-14 w-32 text-l text-center rounded-lg">
            <span className="m-auto">Sign In</span>
          </div>
        </div>
      </div>

    </div>
  );
}