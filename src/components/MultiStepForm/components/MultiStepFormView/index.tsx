import { memo } from 'react';
import { MultiStepFormViewProps } from './types';
import { FormProvider, useForm } from 'react-hook-form';
import { useMultiStepFormController } from '../../context/MultiStepFormControllerContext';

// NOTE: Provided from https://github.com/martiserra99/formity-react-docs/blob/main/src/components/form-view.tsx
const MultiStepFormView: React.FC<MultiStepFormViewProps> = ({ defaultValues, resolver, children }) => {
    const form = useForm({ defaultValues, resolver });
    const { onNext } = useMultiStepFormController();

    return (
        <form onSubmit={form.handleSubmit(onNext)} noValidate>
            <FormProvider {...form}>{children}</FormProvider>
        </form>
    );
};

export default memo(MultiStepFormView);
