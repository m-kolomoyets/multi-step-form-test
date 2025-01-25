import { FieldPath, FieldValues } from 'react-hook-form';
import Input from '@/ui/Input';

export type InputFieldProps<TValues extends FieldValues, TName extends FieldPath<TValues> = FieldPath<TValues>> = {
    name: TName;
    label: string;
} & Omit<React.ComponentProps<typeof Input>, 'name' | 'label' | 'onChange'>;
