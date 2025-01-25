import type { Cond, Form, GetState, OnBack, OnNext, Return, SetState, Variables } from '@formity/react';
import type { CompanyDetailsStepValues } from './components/CompanyDetailsStep/types';
import type { ContactDetailsStepValues } from './components/ContactDetailsStep/types';
import type { PlanAffiliatesStepValues } from './components/PlanAffiliatesStep/types';
import { PlanStepValues } from './components/PlanStep/types';

export type MultiFormStepProps = {
    /**
     * Current step
     */
    step: string;
    /**
     * Next step handler
     */
    onNext: OnNext;
    /**
     * Back step handler
     */
    onBack: OnBack;
    /**
     * State getter
     */
    getState: GetState;
    /**
     * State setter
     */
    setState: SetState;
    /**
     * Inputs
     */
    inputs?: {
        plan?: string;
    };
};

export type MultiStepFormValues = [
    Form<PlanStepValues>,
    Variables<PlanStepValues>,
    Cond<{
        then: [Form<PlanAffiliatesStepValues>];
        else: [];
    }>,
    Form<ContactDetailsStepValues>,
    Form<CompanyDetailsStepValues>,
    Return<CompanyDetailsStepValues>,
];
