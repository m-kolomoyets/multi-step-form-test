import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import type { InputFieldProps } from './types';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import Input from '@/ui/Input';

const InputField = <TValues extends FieldValues, TName extends FieldPath<TValues> = FieldPath<TValues>>({
    name,
    label,
    ...rest
}: InputFieldProps<TValues, TName>) => {
    const { control } = useFormContext<TValues>();

    return (
        <FormField<TValues>
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input {...field} {...rest} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export default InputField;
