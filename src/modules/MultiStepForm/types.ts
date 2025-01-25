import type { GetState, OnBack, OnNext, SetState } from '@formity/react';

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
};
