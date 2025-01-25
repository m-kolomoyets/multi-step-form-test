import type { FieldValues } from 'react-hook-form';

export type MultiStepFormStepSubmitHandler<TValues extends FieldValues = FieldValues> = (
    // eslint-disable-next-line no-unused-vars
    data: TValues,
    // eslint-disable-next-line no-unused-vars
    { onSuccess }: { onSuccess: () => void }
) => void;
