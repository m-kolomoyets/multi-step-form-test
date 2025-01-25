import { FieldPath, FieldValues } from 'react-hook-form';
import { NumericFormatProps } from 'react-number-format';

export type NumericInputFieldProps<TValues extends FieldValues, TName extends FieldPath<TValues>> = {
    name: TName;
    label: string;
} & Omit<NumericFormatProps, 'customInput'>;
