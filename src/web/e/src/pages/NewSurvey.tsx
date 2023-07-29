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
                    mainTraits: ['I am a', 'I am a', 'I am a'],
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
                    <Form>
                        <Field name='mainTraits[0]'></Field>
                        <Field name='mainTraits[1]'></Field>
                        <Field name='mainTraits[2]'></Field>

                        <Field name='subTraits[0]'></Field>
                        <Field name='subTraits[1]'></Field>
                        <Field name='subTraits[2]'></Field>

                        <Field name='miniTraits[0]'></Field>
                        <Field name='miniTraits[1]'></Field>
                        <Field name='miniTraits[2]'></Field>

                        <Field name='question'></Field>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>

                )}

            </Formik>
        </div>
    )
}