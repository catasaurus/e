import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

/*
export interface mainPageProps {
    session: Session | undefined
}
*/

export default function MainPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    function newSurveyButtonOnMouseEnter() {
        setIsHovered(true);
    }

    function newSurveyButtonOnMouseLeave() {
        setIsHovered(false);
    }

    function newSurveyOnClick() {
        void router.push('/NewSurvey')
    }

    let newSurveyButtonStyle = "flex bg-black h-16 w-32 text-center text-white rounded-lg m-5 relative";
    if (isHovered) {
        newSurveyButtonStyle = "flex bg-black h-20 w-36 text-center text-white rounded-lg m-5 relative"
    }
    
    useEffect(() => {
        if (!session) {
            void router.push('/')
        }
    })
    

    return (
        <div className="flex justify-center">
            <div className={newSurveyButtonStyle} onMouseEnter={newSurveyButtonOnMouseEnter} onMouseLeave={newSurveyButtonOnMouseLeave} onClick={newSurveyOnClick}>
                <span className="m-auto">New survey</span>
            </div>
        </div>
    )
}