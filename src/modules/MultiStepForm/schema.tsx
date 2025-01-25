import type { Form, Return, Schema } from '@formity/react';
import CompanyDetailsStep from './components/CompanyDetailsStep';
import { CompanyDetailsStepValues } from './components/CompanyDetailsStep/types';
import ContactDetailsStep from './components/ContactDetailsStep';
import { ContactDetailsStepValues } from './components/ContactDetailsStep/types';

export type MultiStepFormValues = [
    Form<ContactDetailsStepValues>,
    Form<CompanyDetailsStepValues>,
    Return<ContactDetailsStepValues & CompanyDetailsStepValues>,
];

export const multiStepFormSchema: Schema<MultiStepFormValues> = [
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
