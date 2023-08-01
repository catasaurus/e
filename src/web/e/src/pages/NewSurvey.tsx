import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { api } from 'e/utils/api';
import Link from 'next/link';

export interface runSurveyInput {
    mainTraits: string[],
    subTraits: string[],
    miniTraits: string[],
    question: string
}

export default function NewSurvey() {
    const { data: session } = useSession();
    const router = useRouter();
    const {mutate, error} = api.survey.runSurvey.useMutation();


    useEffect(() => {
        if (!session) {
            void router.push('/')
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
                onSubmit={(values) => {
                    //setSubmitting(false);
                    const input = {
                        mainTraits: values.mainTraits,
                        subTraits: values.subTraits,
                        miniTraits: values.miniTraits,
                        question: values.question
                    };
                    mutate(input);

                    void router.push('/MainPage')
                }}

            >
                {({isSubmitting}) => (
                    <div className="flex flex-row justify-center">
                        <Form className="flex flex-col scroll-snap-type-y mandatory overflow-scroll">
                            <div className="flex flex-col justify-center h-screen bg-gray-500 scroll-snap-align-start shrink-0">
                                <div className="m-6 text-black text-center text-5xl">
                                    Main traits
                                </div>

                                <div className="flex flex-col justify-center text-gray-300 m-12">
                                    <div className="relative m-4 bg-gray-400 h-14 w-64 rounded-lg">
                                        <span className="absolute top-3.5 left-4 text-lg">You are a</span>
                                        <Field className="absolute m-4 h-6 w-36 left-20 bottom-0 bg-gray-400 text-lg" name='mainTraits[0]'/>
                                    </div>
                                    
                                    <div className="relative m-4 bg-gray-400 h-14 w-64 rounded-lg">
                                        <span className="absolute top-3.5 left-4 text-lg">You are a</span>
                                        <Field className="absolute m-4 h-6 w-36 left-20 bottom-0 bg-gray-400 text-lg" name='mainTraits[1]'/>
                                    </div>
                                    
                                    <div className="relative m-4 bg-gray-400 h-14 w-64 rounded-lg">
                                        <span className="absolute top-3.5 left-4 text-lg">You are a</span>
                                        <Field className="absolute m-4 h-6 w-36 left-20 bottom-0 bg-gray-400 text-lg" name='mainTraits[2]'/>
                                    </div>

                                </div>

                                <Link scroll={false} href="#subtraits" className="relative mx-auto -bottom-24 flex flex-col justify-center bg-black h-20 w-36 rounded-lg text-white text-center text-2xl">
                                    <span>Next</span>
                                </Link>
                            </div>

                            <div className="flex flex-col justify-center h-screen bg-gray-500 scroll-snap-align-start shrink-0" id="subtraits">
                                <div className="m-6 text-black text-center text-5xl">
                                    Sub traits
                                </div>

                                <div className="flex flex-col justify-center text-gray-300 m-12">
                                    <div className="relative m-4 bg-gray-400 h-14 w-64 rounded-lg">
                                        <span className="absolute top-3.5 left-2 text-lg">You like to</span>
                                        <Field className="absolute m-4 h-6 w-36 left-20 bottom-0 bg-gray-400 text-lg" name='subTraits[0]'/>
                                    </div>
                                    
                                    <div className="relative m-4 bg-gray-400 h-14 w-64 rounded-lg">
                                        <span className="absolute top-3.5 left-2 text-lg">You like to</span>
                                        <Field className="absolute m-4 h-6 w-36 left-20 bottom-0 bg-gray-400 text-lg" name='subTraits[1]'/>
                                    </div>
                                    
                                    <div className="relative m-4 bg-gray-400 h-14 w-64 rounded-lg">
                                        <span className="absolute top-3.5 left-2 text-lg">You like to</span>
                                        <Field className="absolute m-4 h-6 w-36 left-20 bottom-0 bg-gray-400 text-lg" name='subTraits[2]'/>
                                    </div>

                                </div>

                                <Link scroll={false} href="#minitraits" className="relative mx-auto -bottom-24 flex flex-col justify-center bg-black h-20 w-36 rounded-lg text-white text-center text-2xl">
                                    <span>Next</span>
                                </Link>
                            </div>

                            <div className="flex flex-col justify-center h-screen bg-gray-500 scroll-snap-align-start shrink-0" id="minitraits">
                                <div className="m-6 text-black text-center text-5xl">
                                    Mini traits
                                </div>

                                <div className="flex flex-col justify-center text-gray-300 m-12">
                                    <div className="relative m-4 bg-gray-400 h-14 w-64 rounded-lg">
                                        <span className="absolute top-3.5 left-2 text-lg">You also</span>
                                        <Field className="absolute m-4 h-6 w-36 left-16 bottom-0 bg-gray-400 text-lg" name='miniTraits[0]'/>
                                    </div>
                                    
                                    <div className="relative m-4 bg-gray-400 h-14 w-64 rounded-lg">
                                        <span className="absolute top-3.5 left-2 text-lg">You also</span>
                                        <Field className="absolute m-4 h-6 w-36 left-16 bottom-0 bg-gray-400 text-lg" name='miniTraits[1]'/>
                                    </div>
                                    
                                    <div className="relative m-4 bg-gray-400 h-14 w-64 rounded-lg">
                                        <span className="absolute top-3.5 left-2 text-lg">You also</span>
                                        <Field className="absolute m-4 h-6 w-36 left-16 bottom-0 bg-gray-400 text-lg" name='miniTraits[2]'/>
                                    </div>

                                </div>

                                <Link scroll={false} href="#submitsection" className="relative mx-auto -bottom-24 flex flex-col justify-center bg-black h-20 w-36 rounded-lg text-white text-center text-2xl">
                                    <span>Next</span>
                                </Link>
                            </div>

                            <div className="flex flex-col justify-center h-screen bg-gray-500 text-white scroll-snap-align-start shrink-0" id="submitsection">
                                <div className="relative text-black text-center text-5xl -top-40">
                                    survey question
                                </div>

                                <span className="relative text-m top-2 text-center text-gray-800">must have have a yes or no answer</span>
                                
                                <div className="mx-auto relative m-4 bg-gray-400 h-14 w-64 rounded-lg">
                                        <Field className="absolute m-4 h-6 w-36 left-16 bottom-0 bg-gray-400 text-lg" name='question'/>
                                    </div>

                                <button type="submit" disabled={isSubmitting} className="relative mx-auto m-4 bg-black h-16 w-32 rounded-lg -bottom-48">
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