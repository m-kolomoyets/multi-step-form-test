import { Command as CommandPrimitive } from 'cmdk';
import type { SelectOption } from '@/types';
import { Command } from '@/components/Command';

export type MultiSelectOption = SelectOption & {
    disable?: boolean;
    /** fixed option that can't be removed. */
    fixed?: boolean;
    /** Group the options by providing key. */
    [key: string]: string | boolean | undefined;
};

export type MultiSelectGroupOption<TOption extends MultiSelectOption = MultiSelectOption> = {
    [key: string]: TOption[];
};

export type MultipleSelectorRef<TOption extends MultiSelectOption = MultiSelectOption> = {
    selectedValue: TOption[];
    input: HTMLInputElement;
    focus: () => void;
    reset: () => void;
};

export type MultipleSelectorProps<TOption extends MultiSelectOption = MultiSelectOption> = {
    ref?: React.Ref<MultipleSelectorRef<TOption>>;
    value?: TOption[];
    defaultOptions?: TOption[];
    /**
     * manually controlled options
     */
    options?: TOption[];
    placeholder?: string;
    /**
     * Loading component.
     */
    loadingIndicator?: React.ReactNode;
    /**
     * Empty component.
     */
    emptyIndicator?: React.ReactNode;
    /**
     * Debounce time for async search. Only work with `onSearch`.
     */
    delay?: number;
    /**
     * Only work with `onSearch` prop. Trigger search when `onFocus`.
     * For example, when user click on the input, it will trigger the search to get initial options.
     */
    triggerSearchOnFocus?: boolean;
    /**
     * async search
     */
    // eslint-disable-next-line no-unused-vars
    onSearch?: (value: string) => Promise<TOption[]>;
    /**
     * sync search. This search will not showing loadingIndicator.
     * The rest props are the same as async search.
     * i.e.: creatable, groupBy, delay.
     */
    // eslint-disable-next-line no-unused-vars
    onSearchSync?: (value: string) => TOption[];
    // eslint-disable-next-line no-unused-vars
    onChange?: (options: TOption[]) => void;
    /**
     * Limit the maximum number of selected options.
     */
    maxSelected?: number;
    /**
     * When the number of selected options exceeds the limit, the onMaxSelected will be called.
     */
    // eslint-disable-next-line no-unused-vars
    onMaxSelected?: (maxLimit: number) => void;
    /**
     * Hide the placeholder when there are options selected.
     */
    hidePlaceholderWhenSelected?: boolean;
    disabled?: boolean;
    /**
     * Group the options base on provided key.
     */
    groupBy?: string;
    className?: string;
    badgeClassName?: string;
    /**
     * First item selected is a default behavior by cmdk. That is why the default is true.
     * This is a workaround solution by add a dummy item.
     *
     * @reference: https://github.com/pacocoursey/cmdk/issues/171
     */
    selectFirstItem?: boolean;
    /**
     * Allow user to create option when there is no option matched.
     */
    creatable?: boolean;
    /**
     * Props of `Command`
     */
    commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
    /**
     * Props of `CommandInput`
     */
    inputProps?: Omit<
        React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
        'value' | 'placeholder' | 'disabled'
    >;
    /**
     * hide the clear all button.
     */
    hideClearAllButton?: boolean;
    /**
     * Custom option renderer. Is used to render both option in dropdown and selected chips.
     */
    // eslint-disable-next-line no-unused-vars
    renderOption?: (option: TOption) => React.ReactNode;
};
