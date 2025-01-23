import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import Label from '@/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/ui/RadioGroup';

const options = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
];

type YesNoFieldProps = {
    name: string;
    label: string;
};

const YesNoField: React.FC<YesNoFieldProps> = ({ name, label }) => {
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
                            <RadioGroup
                                defaultValue={field.value ? 'yes' : 'no'}
                                onValueChange={(value) => {
                                    field.onChange(value === 'yes');
                                }}
                            >
                                {options.map((option) => {
                                    return (
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value={option.value} id={option.value} />
                                            <Label htmlFor={option.value}>{option.label}</Label>
                                        </div>
                                    );
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export default memo(YesNoField);
