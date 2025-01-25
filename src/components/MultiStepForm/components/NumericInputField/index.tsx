import { useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import type { FieldPath, FieldValues } from 'react-hook-form';
import type { NumericInputFieldProps } from './types';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import Input from '@/ui/Input';

const NumericInputField = <TValues extends FieldValues, TName extends FieldPath<TValues>>({
    name,
    label,
    ...rest
}: NumericInputFieldProps<TValues, TName>) => {
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
                            <NumericFormat
                                {...rest}
                                customInput={Input}
                                value={field.value}
                                onValueChange={({ floatValue }) => {
                                    field.onChange(floatValue);
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export default NumericInputField;
