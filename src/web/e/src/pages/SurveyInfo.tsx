import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "e/utils/api";
import z from "zod";
import { SquareLoader } from "react-spinners";

export default function SurveyInfo() {
    const router = useRouter();
    const session = useSession();

    const [isQueryCompleted, setIsQueryCompleted] = useState(false);

    const surveyId = z.string().parse(router.query.surveyId);
    const survey = api.survey.getSurveyData.useQuery({ surveyId: surveyId });

    useEffect(() => {
        if (survey.status == 'success' && isQueryCompleted == false) {
            setIsQueryCompleted(true);
        }
        else if (survey.status == 'error') {
            void router.push('/')
        }

    }, [survey.status])

    useEffect(() => {
        if (!session) {
            void router.push('/')
        }
    })

    if (isQueryCompleted) {
        if (survey.data != undefined && typeof survey.data != "string") {
            const stats = {};
            const s = z.string()
            survey.data.SurveyEntry.map((entry) => {
                const mainTrait: string = s.parse(entry.user.slice(9).split(". You also")[0]).trim();
                const subTrait: string = s.parse(s.parse(entry.user.slice(9).split(". You also")[1]).split("A fact about you is that you:")[1]).trim();
            })
        }
    }

    return (
    <div className="flex flex-row justify-center h-screen">
        <div className="flex flex-col justify-center">
            <SquareLoader
                color={'black'}
                loading={!isQueryCompleted}
                speedMultiplier={1.5}
            />
        </div>
    </div>
    )

}