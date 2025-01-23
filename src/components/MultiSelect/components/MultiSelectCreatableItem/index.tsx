import { useCallback } from 'react';
import type { MultiSelectOption } from '../../types';
import type { MultiSelectCreatableItemProps } from './types';
import { CommandItem } from '@/components/Command';

const MultiSelectCreatableItem = <TOption extends MultiSelectOption = MultiSelectOption>({
    inputValue,
    selected,
    maxSelected,
    onInputValueChange,
    onMaxSelected,
    onChange,
    onSelectedChange,
}: MultiSelectCreatableItemProps<TOption>) => {
    const mouseDownHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const selectHandler = useCallback(
        (value: string) => {
            if (selected.length >= maxSelected) {
                onMaxSelected?.(selected.length);
                return;
            }

            const newOptions = [...selected, { value, label: value }] as TOption[];

            onInputValueChange('');
            onSelectedChange(newOptions);
            onChange?.(newOptions);
        },
        [maxSelected, onChange, onInputValueChange, onMaxSelected, onSelectedChange, selected]
    );

    return (
        <CommandItem
            value={inputValue}
            className="cursor-pointer"
            onMouseDown={mouseDownHandler}
            onSelect={selectHandler}
        >
            {`Create "${inputValue}"`}
        </CommandItem>
    );
};

export default MultiSelectCreatableItem;
