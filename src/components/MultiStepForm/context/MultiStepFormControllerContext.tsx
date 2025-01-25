import { createContext, useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { GetState, OnBack, OnNext, SetState } from '@formity/react';
import { useSafeContext } from '@/hooks/useSafeContext';

type AnimatePath = 'none' | 'next' | 'back';

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

const ANIMATE_PATHS = {
    none: {},
    next: {
        animate: { x: -100, opacity: 0, transition: { delay: 0, duration: 0.25 } },
    },
    back: {
        animate: { x: 100, opacity: 0, transition: { delay: 0, duration: 0.25 } },
    },
};

let previousAnimate: AnimatePath = 'none';

// NOTE: Provided from https://github.com/martiserra99/formity-react-docs/tree/main/src/controller
export const MultiStepFormController: React.FC<MultiStepFormControllerProps> = ({
    step,
    onNext,
    onBack,
    getState,
    setState,
    children,
}) => {
    const [animatePath, setAnimatePath] = useState<AnimatePath>('none');

    const handleNext = useCallback<OnNext>(
        (values) => {
            setAnimatePath('next');
            previousAnimate = 'next';
            setTimeout(() => {
                onNext(values);
            }, 250);
        },
        [onNext, setAnimatePath]
    );

    const handleBack = useCallback<OnBack>(
        (values) => {
            setAnimatePath('back');
            previousAnimate = 'back';
            setTimeout(() => {
                onBack(values);
            }, 250);
        },
        [onBack, setAnimatePath]
    );

    const memoizedContextValue = useMemo(() => {
        return {
            onNext: handleNext,
            onBack: handleBack,
            getState,
            setState,
        };
    }, [handleNext, handleBack, getState, setState]);

    return (
        <AnimatePresence>
            <motion.div
                key={step}
                initial={previousAnimate === 'back' ? { opacity: 0, x: -100 } : { opacity: 0, x: 100 }}
                exit={{
                    x: 100,
                    opacity: 0,
                    transition: { delay: 0, duration: 0.25 },
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    transition: { delay: 0.25, duration: 0.25 },
                }}
                {...ANIMATE_PATHS[animatePath]}
                className="h-full"
            >
                <MultiStepFormControllerContext value={memoizedContextValue}>{children}</MultiStepFormControllerContext>
            </motion.div>
        </AnimatePresence>
    );
};

export const useMultiStepFormController = () => {
    const context = useSafeContext(MultiStepFormControllerContext as React.Context<unknown>);

    return context as MultiStepFormControllerProps;
};
