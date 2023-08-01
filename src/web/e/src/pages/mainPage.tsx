import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "e/utils/api";
import { SquareLoader, DotLoader } from "react-spinners";
import { SyncIcon } from "@primer/octicons-react";

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
    const [surveyCardHoveredKey, setSurveyCardHoveredKey] = useState<string>();

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

        function surveyCardOnMouseEnter(key: string) {
            setSurveyCardHoveredKey(key);
            //console.log("surveycard + " + key)
        }

        function surveyCardOnMouseLeave() {
            setSurveyCardHoveredKey(undefined);
        }
    
    
        let newSurveyButtonStyle = "flex bg-black h-16 w-32 text-center text-white rounded-lg m-5 mx-auto";
        if (isHovered) {
            newSurveyButtonStyle = "flex bg-black h-20 w-36 text-center text-white rounded-lg m-5 mx-auto";
        }
        
        const surveyItems: JSX.Element[] = [];
        if (surveys.data != undefined) {

            //let key = 0;
            let surveyCardStyle = "flex flex-col justify-center m-28 bg-gray-50 h-48 w-72 rounded-xl shadow-lg";

            surveys.data.map((survey) => {
                /*
                let statusMessage = "processing";
                if (survey.status) {
                    statusMessage = "completed"
                }
                */
                if (!survey.status) {
                    surveyItems.push(
                        <div className="flex flex-col justify-center m-28 bg-gray-50 h-48 w-72 rounded-xl shadow-lg" key={survey.surveyId}>
                            <DotLoader loading={!survey.status} color={'#DCD6D0'} size={40} className="mx-auto"/>
                        </div>
                        )
                }
                else {
                    //console.log(survey.surveyId)
                    //console.log(surveyCardHoveredKey)
                    if (surveyCardHoveredKey == survey.surveyId) {
                        //console.log("key matches")
                        surveyCardStyle = "flex flex-col justify-center m-28 bg-gray-50 h-48 w-72 rounded-xl shadow-2xl border-gray-500 border border-opacity-5"
                    }

                    console.log(surveyCardStyle)
                    surveyItems.push(
                        <div className={surveyCardStyle} key={survey.surveyId} onMouseEnter={() => surveyCardOnMouseEnter(survey.surveyId)} onMouseLeave={surveyCardOnMouseLeave}>
                            <span className="mx-auto text-gray-500 font-extralight">{survey.question}</span>
                            <SyncIcon className="relative top-10 mx-auto" size={24}/>
                        </div>
                        
                    )
                }
                surveyCardStyle = "flex flex-col justify-center m-28 bg-gray-50 h-48 w-72 rounded-xl shadow-lg";

                //key++
            })
        }
        
        //console.log(surveyItems)
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