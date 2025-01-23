import { SelectOption } from '@/types';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select';

type SelectFieldProps = {
    name: string;
    label: string;
    options: SelectOption[];
};

const SelectField: React.FC<SelectFieldProps> = ({ name, label, options }) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map((option) => {
                                        return (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export default SelectField;
