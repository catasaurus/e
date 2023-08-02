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

    let surveyId = "";
    if (router.query.surverId != undefined) {
        surveyId = z.string().parse(router.query.surveyId);
    }
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
        // I know all of this is not optimal for performance
        // too much to do to add traits, etc when creating entry
        if (survey.data != undefined && typeof survey.data != "string") {
            const counts: Record<string, boolean[]> = {};
            const s = z.string();
            survey.data.SurveyEntry.map((entry) => {
                const mainTrait: string = s.parse(entry.user.slice(9).split(". You also")[0]).trim();
                const subTrait: string = s.parse(s.parse(entry.user.slice(9).split(". You also")[1]).split(". A fact about you is that you:")[0]).trim();
                const miniTrait: string = s.parse(s.parse(entry.user.slice(9).split(". You also")[1]).split(". A fact about you is that you:")[1]).trim();
                
                counts[mainTrait] = [entry.result].concat(counts[mainTrait]!);
                counts[subTrait] = [entry.result].concat(counts[subTrait]!);
                counts[miniTrait] = [entry.result].concat(counts[miniTrait]!);
            })

            //console.log(counts)

            // percentage that is true
            const stats: Record<string, number> = {};

            for (const key in counts) {
                const length: number = counts[key]!.length
                let trueCount = 0;

                for (const result of counts[key]!) {
                    if (result == true) {
                        trueCount++
                    }
                }

                stats[key] = (trueCount / length) * 100;
            }

            const items: JSX.Element[] = [];

            for (const key in stats) {
                items.push(
                    <div key={key} className="mx-auto m-8 flex flex-col bg-gray-500 rounded-lg">
                        <span className="m-4 text-center">{key}</span>

                        <div className="flex flex-row justify-center">
                            <span className="m-8">{stats[key]}% true</span>

                            <span className="m-8">{100-stats[key]!}% false</span>
                        </div>
                    </div>
                )
            }

            return (
                <div>
                    <div className="fixed flex flex-col justify-center w-screen bg-gray-400 text-center text-3xl rounded-b-lg h-20">
                        <span>{survey.data.question}</span>
                    </div>

                    <div className="relative top-20 flex flex-col justify-center">
                        {items}
                    </div>
                </div>
            )
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