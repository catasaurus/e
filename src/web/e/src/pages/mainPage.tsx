import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "e/utils/api";
import { SquareLoader } from "react-spinners";
import z from "zod";

/*
export interface mainPageProps {
    session: Session | undefined
}
*/

export default function MainPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const [isHovered, setIsHovered] = useState(false);
    const [isQueryCompleted, setIsQueryCompleted] = useState(false);

    // takes not input as userId is all that is needed, and it is passed as context automatically
    const surveys = api.survey.getSurveys.useQuery({});

    useEffect(() => {
        if (surveys.status == 'success') {
            setIsQueryCompleted(true)
        }
        else if (surveys.status == 'error') {
            void router.push('/')
        }
    }, [surveys.status])

    useEffect(() => {
        if (!session) {
            void router.push('/')
        }
    }, [session])

    if (isQueryCompleted) {
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
        
        const surveyItems: JSX.Element[] = [];
        if (surveys.data != undefined) {
            for (const survey of surveys.data) {
                surveyItems.push(<div>
                    question: {survey.question}
                    statsu: {survey.status}
                </div>)
            }
        }
    
        return (
            <div className="flex justify-center">
                <div className={newSurveyButtonStyle} onMouseEnter={newSurveyButtonOnMouseEnter} onMouseLeave={newSurveyButtonOnMouseLeave} onClick={newSurveyOnClick}>
                    <span className="m-auto">New survey</span>
                </div>
                {surveyItems}
            </div>
        )
    }



    return (
        <div className="flex flex-row justify-center h-screen">
            <div className="flex flex-col justify-center">
                <SquareLoader
                    color={'black'}
                    loading={isQueryCompleted}
                    speedMultiplier={1.5}
                />
            </div>
        </div>
    )
}