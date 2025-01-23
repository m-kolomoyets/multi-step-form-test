import React, { createContext, useMemo } from 'react';
import type { GetState, OnBack, OnNext, SetState } from '@formity/react';
import { useSafeContext } from '@/hooks/useSafeContext';

export type MultiStepFormControllerState = {
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

export type MultiStepFormControllerProps = React.PropsWithChildren<{
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
}>;

export const MultiStepFormControllerContext = createContext<MultiStepFormControllerState | null>(null);
MultiStepFormControllerContext.displayName = 'MultiStepFormControllerContext';

// NOTE: Provided from https://github.com/martiserra99/formity-react-docs/tree/main/src/controller
export const MultiStepFormController: React.FC<MultiStepFormControllerProps> = ({
    step,
    onNext,
    onBack,
    getState,
    setState,
    children,
}) => {
    const memoizedContextValue = useMemo(() => {
        return {
            onNext,
            onBack,
            getState,
            setState,
        };
    }, [onNext, onBack, getState, setState]);

    return (
        <div key={step} className="h-full">
            <MultiStepFormControllerContext value={memoizedContextValue}>{children}</MultiStepFormControllerContext>
        </div>
    );
};

export const useMultiStepFormController = () => {
    const context = useSafeContext(MultiStepFormControllerContext as React.Context<unknown>);

    return context as MultiStepFormControllerProps;
};
