import type { MultiSelectGroupOption, MultiSelectOption } from '../types';

export const removePickedOption = <TOption extends MultiSelectOption = MultiSelectOption>(
    groupOption: MultiSelectGroupOption<TOption>,
    picked: TOption[]
) => {
    const cloneOption = JSON.parse(JSON.stringify(groupOption)) as MultiSelectGroupOption<TOption>;

    for (const [key, value] of Object.entries(cloneOption)) {
        cloneOption[key] = value.filter((val) => {
            return !picked.find((p) => {
                return p.value === val.value;
            });
        });
    }
    return cloneOption;
};
