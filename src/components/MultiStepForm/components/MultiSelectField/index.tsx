import { useFormContext } from 'react-hook-form';
import type { SelectOption } from '@/types';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import MultipleSelector from '@/components/MultiSelect';

type MultiSelectFieldProps = {
    name: string;
    label: string;
    placeholder: string;
    options: SelectOption[];
};

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({ name, label, placeholder, options }) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const values = options.filter((option) => {
                    return field.value.includes(option.value);
                });

                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <MultipleSelector
                                className="w-full"
                                commandProps={{
                                    label,
                                }}
                                defaultOptions={options}
                                value={values}
                                placeholder={placeholder}
                                emptyIndicator={<p className="text-center text-sm">No results found</p>}
                                onChange={(newValues) => {
                                    field.onChange(
                                        newValues.map((value) => {
                                            return value.value;
                                        })
                                    );
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

export default MultiSelectField;
