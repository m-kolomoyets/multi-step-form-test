import type { MultiSelectGroupOption, MultiSelectOption } from '../types';

export const isOptionsExist = (groupOption: MultiSelectGroupOption, targetOption: MultiSelectOption[]) => {
    for (const [, value] of Object.entries(groupOption)) {
        if (
            value.some((option) => {
                return targetOption.find((p) => {
                    return p.value === option.value;
                });
            })
        ) {
            return true;
        }
    }
    return false;
};
