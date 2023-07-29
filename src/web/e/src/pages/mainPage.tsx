import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

/*
export interface mainPageProps {
    session: Session | undefined
}
*/

export default function mainPage() {
    const { data: session } = useSession();
    const router = useRouter();
    
    if (!session) {
        router.push('/')
    }
}