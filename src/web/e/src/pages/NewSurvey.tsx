import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { api } from 'e/utils/api';


export default function NewSurvey() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push('/')
        }
    })

    return (
        <div>
            <Formik
                initialValues={{
                    mainTraits: ['', '', ''],
                    subTraits: ['', '', ''],
                    miniTraits: ['', '', ''],
                    question: ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    const input = {
                        mainTraits: values.mainTraits,
                        subTraits: values.subTraits,
                        miniTraits: values.miniTraits,
                        question: values.question
                    };
                    api.survey.runSurvey.useQuery(input);
                }}

            >
                {({isSubmitting}) => (
                    <div className="flex flex-row justify-center">
                        <Form className="flex flex-col">
                            <div className="flex flex-col justify-center h-screen bg-gray-500">
                                <div className="m-6 text-black text-center text-5xl">
                                    Main traits
                                </div>
                                <div className="flex flex-col justify-center text-white m-12">
                                    <Field className="m-4 bg-black h-16 w-64 rounded-lg" name='mainTraits[0]'/>
                                    <Field className="m-4 bg-black h-16 rounded-lg" name='mainTraits[1]'/>
                                    <Field className="m-4 bg-black h-16 rounded-lg" name='mainTraits[2]'/>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center h-screen bg-gray-500">
                                <div className="m-6 text-black text-center text-5xl">
                                    Sub traits
                                </div>
                                <div className="flex flex-col justify-center text-white m-12">
                                    <Field className="m-4 bg-black h-16 w-64 rounded-lg" name='subTraits[0]'/>
                                    <Field className="m-4 bg-black h-16 rounded-lg" name='subTraits[1]'/>
                                    <Field className="m-4 bg-black h-16 rounded-lg" name='subTraits[2]'/>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center h-screen bg-gray-500">
                                <div className="m-6 text-black text-center text-5xl">
                                    Mini traits
                                </div>
                                <div className="flex flex-col justify-center text-white m-12">
                                    <Field className="m-4 bg-black h-16 w-64 rounded-lg" name='miniTraits[0]'/>
                                    <Field className="m-4 bg-black h-16 rounded-lg" name='miniTraits[1]'/>
                                    <Field className="m-4 bg-black h-16 rounded-lg" name='miniTraits[2]'/>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center h-screen bg-gray-500 text-white">
                                <Field name="question" className="m-4 bg-black h-16 w-64 rounded-lg"/>

                                <button type="submit" disabled={isSubmitting} className="m-4 bg-black h-12 w-28 rounded-lg">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </div>

                )}

            </Formik>
        </div>
    )
}