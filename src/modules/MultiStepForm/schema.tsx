import type { Cond, Form, Return, Schema } from '@formity/react';
import type { CompanyDetailsStepValues } from './components/CompanyDetailsStep/types';
import type { ContactDetailsStepValues } from './components/ContactDetailsStep/types';
import type { PlanAffiliatesStepValues } from './components/PlanAffiliatesStep/types';
import type { PlanStepValues } from './components/PlanStep/types';
import { PLAN_IDS } from '@/constants';
import CompanyDetailsStep from './components/CompanyDetailsStep';
import ContactDetailsStep from './components/ContactDetailsStep';
import PlanAffiliatesStep from './components/PlanAffiliatesStep';
import PlanStep from './components/PlanStep';

export type MultiStepFormValues = [
    Form<PlanStepValues>,
    Cond<{
        then: [Form<PlanAffiliatesStepValues>];
        else: [];
    }>,
    Form<ContactDetailsStepValues>,
    Form<CompanyDetailsStepValues>,
    Return<ContactDetailsStepValues & CompanyDetailsStepValues>,
];

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
            render({ values, onNext, onBack, getState, setState }) {
                return (
                    <ContactDetailsStep
                        key="contactDetails"
                        step="contactDetails"
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
            render({ values, onNext, onBack, getState, setState }) {
                return (
                    <CompanyDetailsStep
                        key="companyDetails"
                        step="companyDetails"
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
        return(values) {
            return values;
        },
    },
];
