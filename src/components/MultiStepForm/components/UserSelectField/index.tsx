import { SelectOption } from '@/types';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/Avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select';

export type UserSelectOption = SelectOption & {
    avatarUrl?: string;
};

type UserSelectFieldProps = {
    name: string;
    label: string;
    options: UserSelectOption[];
};

const AVATAR_FALLBACK_COLORS_CLASSES = [
    {
        text: 'bg-red-500',
        bg: 'bg-red-500/20',
    },
    {
        text: 'bg-green-500',
        bg: 'bg-green-500/20',
    },
    {
        text: 'bg-blue-500',
        bg: 'bg-blue-500/20',
    },
    {
        text: 'bg-yellow-500',
        bg: 'bg-yellow-500/20',
    },
];

const UserSelectField: React.FC<UserSelectFieldProps> = ({ name, label, options }) => {
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
                                <SelectContent className="max-h-[300px]">
                                    {options.map((option, optionIndex) => {
                                        const index = optionIndex % AVATAR_FALLBACK_COLORS_CLASSES.length;
                                        const fallbackColor = AVATAR_FALLBACK_COLORS_CLASSES[index];

                                        return (
                                            <SelectItem value={option.value}>
                                                <span className="flex items-center gap-2">
                                                    <Avatar className="size-6">
                                                        <AvatarImage className="!rounded-md" src={option.avatarUrl} />
                                                        <AvatarFallback
                                                            className={` ${fallbackColor.text} ${fallbackColor.bg}`}
                                                        >
                                                            {option.label.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="truncate">{option.label}</span>
                                                </span>
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

export default UserSelectField;
