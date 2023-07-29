import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "e/utils/api";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  if (!session) {

    function onMouseEnterAuthButton(event: React.MouseEvent): void {
      setIsHovered(true)
    }

    function onMouseLeaverAuthButton(event: React.MouseEvent): void{
      setIsHovered(false)
    }

    function onClickGetStarted(): void {
      void signIn()
    }

    let authButtonStyle = "flex bg-gray-600 h-20 w-32 text-xl text-center rounded-lg"
    if (isHovered) {
      authButtonStyle = "flex bg-gray-600 h-24 w-36 text-xl text-center rounded-lg"
    }
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
            <div className={authButtonStyle} onMouseEnter={onMouseEnterAuthButton} onMouseLeave={onMouseLeaverAuthButton} onClick={onClickGetStarted}>
              <span className="m-auto">Get Started</span>
            </div>
            <div className="flex bg-gray-600 h-20 w-32 text-xl text-center rounded-lg">
              <span className="m-auto">Sign In</span>
            </div>
          </div>
        </div>

      </div>
    );
  }

  else {
    void router.push('/MainPage');
  }
}