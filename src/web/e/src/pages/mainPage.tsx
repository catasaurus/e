import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "e/utils/api";
import { SquareLoader, DotLoader } from "react-spinners";

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
    const [isSurveyCardHovered, setIsSurveyCardHovered] = useState(false);

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
            void router.push('/NewSurvey');
        }

        function surveyCardOnMouseEnter() {
            setIsSurveyCardHovered(true);
        }

        function surveyCardOnMouseLeave() {
            setIsSurveyCardHovered(false);
        }
    
    
        let newSurveyButtonStyle = "flex bg-black h-16 w-32 text-center text-white rounded-lg m-5 mx-auto";
        if (isHovered) {
            newSurveyButtonStyle = "flex bg-black h-20 w-36 text-center text-white rounded-lg m-5 mx-auto";
        }

        let surveyCardStyle = "flex flex-col justify-center m-28 bg-gray-50 h-48 w-72 rounded-xl shadow-lg";
        if (isSurveyCardHovered) {
            surveyCardStyle = "flex flex-col justify-center m-28 bg-gray-50 h-48 w-72 rounded-xl shadow-xl border-black border-"
        }
        
        const surveyItems: JSX.Element[] = [];
        let key = 0;
        if (surveys.data != undefined) {
            for (const survey of surveys.data) {
                /*
                let statusMessage = "processing";
                if (survey.status) {
                    statusMessage = "completed"
                }
                */
                if (!survey.status) {
                surveyItems.push(
                    <div className="flex flex-col justify-center m-28 bg-gray-50 h-48 w-72 rounded-xl shadow-lg" key={key}>
                        <DotLoader loading={!survey.status} color={'#DCD6D0'} size={40} className="mx-auto"/>
                    </div>
                    )
                }
                else {
                    surveyItems.push(
                        <div className={surveyCardStyle} key={key} onMouseEnter={surveyCardOnMouseEnter} onMouseLeave={surveyCardOnMouseLeave}>
                            <span className="mx-auto text-gray-500 font-extralight">{survey.question}</span>
                        </div>
                        
                    )
                }
                key += 1
            }
        }
    
        return (
            <div className="flex justify-center">
                <div className="fixed w-screen">
                    <div className={newSurveyButtonStyle} onMouseEnter={newSurveyButtonOnMouseEnter} onMouseLeave={newSurveyButtonOnMouseLeave} onClick={newSurveyOnClick}>
                        <span className="m-auto">New survey</span>
                    </div>
                    <div className="h-0.5 bg-slate-500 bg-opacity-20"/>
                </div>

                <div className="relative top-20 flex flex-wrap">
                    {surveyItems}
                </div>
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