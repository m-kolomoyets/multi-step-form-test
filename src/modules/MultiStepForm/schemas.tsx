import { z } from 'zod';
import type { Schema } from '@formity/react';
import type { MultiStepFormValues } from './types';
import { PLAN_IDS } from '@/constants';
import CompanyDetailsStep from './components/CompanyDetailsStep';
import ContactDetailsStep from './components/ContactDetailsStep';
import PlanAffiliatesStep from './components/PlanAffiliatesStep';
import PlanStep from './components/PlanStep';

export const multipleFormSearchParamsSchema = z.object({
    isSuccess: z.boolean().optional(),
});

export const multiStepFormSchema: Schema<MultiStepFormValues> = [
    {
        form: {
            values() {
                return {
                    plan: [PLAN_IDS.basic, []],
                };
            },
            render({ values, onNext, onBack, getState, setState }) {
                return (
                    <PlanStep
                        key="plan"
                        step="plan"
                        values={values}
                        onNext={onNext}
                        onBack={onBack}
                        getState={getState}
                        setState={setState}
                    />
                );
            },
        },
    },
    {
        variables({ plan }) {
            return {
                plan,
            };
        },
    },
    {
        cond: {
            if({ plan }) {
                return plan === PLAN_IDS.pro;
            },
            then: [
                {
                    form: {
                        values() {
                            return {
                                affiliate: ['', []],
                            };
                        },
                        render({ values, onNext, onBack, getState, setState }) {
                            return (
                                <PlanAffiliatesStep
                                    key="planAffiliates"
                                    step="planAffiliates"
                                    values={values}
                                    onNext={onNext}
                                    onBack={onBack}
                                    getState={getState}
                                    setState={setState}
                                />
                            );
                        },
                    },
                },
            ],
            else: [],
        },
    },
    {
        form: {
            values() {
                return {
                    firstName: ['', []],
                    lastName: ['', []],
                    email: ['', []],
                };
            },
            render({ values, onNext, onBack, getState, setState, inputs }) {
                return (
                    <ContactDetailsStep
                        key="contactDetails"
                        step="contactDetails"
                        values={values}
                        inputs={inputs}
                        onNext={onNext}
                        onBack={onBack}
                        getState={getState}
                        setState={setState}
                    />
                );
            },
        },
    },
    {
        form: {
            values() {
                return {
                    companyName: ['', []],
                    initialEmployees: [0, []],
                    address: ['', []],
                    city: ['', []],
                    state: ['', []],
                };
            },
            render({ values, onNext, onBack, getState, setState, inputs }) {
                return (
                    <CompanyDetailsStep
                        key="companyDetails"
                        step="companyDetails"
                        values={values}
                        inputs={inputs}
                        onNext={onNext}
                        onBack={onBack}
                        getState={getState}
                        setState={setState}
                    />
                );
            },
        },
    },
    {
        return(values) {
            return values;
        },
    },
];
