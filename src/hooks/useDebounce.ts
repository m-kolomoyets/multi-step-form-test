import { useState } from 'react';
import { useDebouncedEffect } from '@react-hookz/web';
import { DEBOUNCE_DEFAULT_DELAY } from '@/constants';

export const useDebounce = <TValue>(value: TValue, delay: number = DEBOUNCE_DEFAULT_DELAY) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useDebouncedEffect(
        () => {
            setDebouncedValue(value);
        },
        [value],
        delay
    );

    return debouncedValue;
};
