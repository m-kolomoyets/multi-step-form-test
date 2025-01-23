import type { MultiSelectGroupOption, MultiSelectOption } from '../types';

export const transToGroupOption = <TOption extends MultiSelectOption = MultiSelectOption>(
    options: TOption[],
    groupBy?: string
) => {
    if (options.length === 0) {
        return {};
    }
    if (!groupBy) {
        return {
            '': options,
        };
    }

    const groupOption: MultiSelectGroupOption<TOption> = {};
    options.forEach((option) => {
        const key = (option[groupBy] as string) || '';
        if (!groupOption[key]) {
            groupOption[key] = [];
        }
        groupOption[key].push(option);
    });
    return groupOption;
};
