import { runSurveyNoPrisma } from "./runSurvey";

await runSurveyNoPrisma(["doctor", "lawyer"], ["bike", "ski"], ["hate food", "love food"], "do you like food?").then((result) => {
    console.log(result)
})