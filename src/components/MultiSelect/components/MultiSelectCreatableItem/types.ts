import type { MultiSelectOption } from '../../types';

export type MultiSelectCreatableItemProps<TOption extends MultiSelectOption = MultiSelectOption> = {
    inputValue?: string;
    selected: TOption[];
    maxSelected: number;
    // eslint-disable-next-line no-unused-vars
    onInputValueChange: (value: string) => void;
    // eslint-disable-next-line no-unused-vars
    onMaxSelected?: (count: number) => void;
    // eslint-disable-next-line no-unused-vars
    onChange?: (options: TOption[]) => void;
    // eslint-disable-next-line no-unused-vars
    onSelectedChange: (options: TOption[]) => void;
};
