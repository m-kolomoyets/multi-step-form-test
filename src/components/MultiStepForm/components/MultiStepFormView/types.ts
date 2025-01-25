import type { FieldValues, UseFormProps } from 'react-hook-form';
import type { MultiStepFormStepSubmitHandler } from '../../types';

export type MultiStepFormViewProps<TValues extends FieldValues> = React.PropsWithChildren<
    Pick<UseFormProps, 'defaultValues' | 'resolver'>
> & {
    onSubmit?: MultiStepFormStepSubmitHandler<TValues>;
    // eslint-disable-next-line no-unused-vars
    onError?: (error: unknown) => void;
} & Omit<React.ComponentProps<'form'>, 'onSubmit'>;
