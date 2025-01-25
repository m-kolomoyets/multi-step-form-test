import { MultiStepFormViewProps } from './types';
import { DefaultValues, FieldValues, FormProvider, Resolver, useForm } from 'react-hook-form';
import { useMultiStepFormController } from '../../context/MultiStepFormControllerContext';

// NOTE: Provided from https://github.com/martiserra99/formity-react-docs/blob/main/src/components/form-view.tsx
const MultiStepFormView = <TValues extends FieldValues = FieldValues>({
    children,
    defaultValues,
    resolver,
    onSubmit,
    onError,
    ...rest
}: MultiStepFormViewProps<TValues>) => {
    const form = useForm<TValues>({
        defaultValues: defaultValues as DefaultValues<TValues>,
        resolver: resolver as Resolver<TValues>,
    });
    const { onNext } = useMultiStepFormController();

    return (
        <form
            {...rest}
            onSubmit={form.handleSubmit((data) => {
                if (onSubmit) {
                    onSubmit(data, {
                        onSuccess() {
                            onNext(data);
                        },
                    });
                    return;
                }

                onNext(data);
            }, onError)}
            noValidate
        >
            <FormProvider {...form}>{children}</FormProvider>
        </form>
    );
};

export default MultiStepFormView;
