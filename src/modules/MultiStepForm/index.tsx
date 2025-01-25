import { memo, useCallback, useState } from 'react';
import { multiStepFormSchema, MultiStepFormValues } from './schema';
import { Formity, OnReturn, ReturnValues } from '@formity/react';
import ProgressBar from '@/components/MultiStepForm/components/ProgressBar';
import FormData from './components/FormData';

const MultiStepForm: React.FC = () => {
    const [formValues, setFormValues] = useState<ReturnValues<MultiStepFormValues> | null>(null);

    const onReturn = useCallback<OnReturn<MultiStepFormValues>>(
        (values) => {
            setFormValues(values);
        },
        [setFormValues]
    );

    if (formValues) {
        return (
            <>
                <ProgressBar total={5} current={5} />
                <FormData
                    data={formValues}
                    onStart={() => {
                        return setFormValues(null);
                    }}
                />
            </>
        );
    }

    return <Formity<MultiStepFormValues> schema={multiStepFormSchema} onReturn={onReturn} />;
};

export default memo(MultiStepForm);
