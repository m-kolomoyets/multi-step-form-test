import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useToggle } from '@react-hookz/web';
import { Command as CommandPrimitive } from 'cmdk';
import { XIcon } from 'lucide-react';
import type { MultipleSelectorProps, MultiSelectGroupOption, MultiSelectOption } from './types';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/utils/cn';
import { isOptionsExist } from './utils/isOptionsExist';
import { removePickedOption } from './utils/removePickedOption';
import { transToGroupOption } from './utils/transToGroupOption';
import { DEBOUNCE_DEFAULT_DELAY } from '@/constants';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/Command';
import { ScrollArea } from '@/ui/ScrollArea';
import MultiSelectCommandEmpty from './components/MultiSelectCommandEmpty';
import MultiSelectCreatableItem from './components/MultiSelectCreatableItem';

const MultipleSelector = <TOption extends MultiSelectOption = MultiSelectOption>({
    ref,
    value,
    onChange,
    placeholder,
    defaultOptions: arrayDefaultOptions = [],
    options: arrayOptions,
    delay = DEBOUNCE_DEFAULT_DELAY,
    onSearch,
    onSearchSync,
    loadingIndicator,
    emptyIndicator,
    maxSelected = Number.MAX_SAFE_INTEGER,
    onMaxSelected,
    hidePlaceholderWhenSelected,
    disabled,
    groupBy,
    className,
    badgeClassName,
    selectFirstItem = true,
    creatable = false,
    triggerSearchOnFocus = false,
    commandProps,
    inputProps,
    hideClearAllButton = false,
    renderOption,
}: MultipleSelectorProps<TOption>) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState(value || []);
    const [options, setOptions] = useState(transToGroupOption(arrayDefaultOptions, groupBy));
    const [inputValue, setInputValue] = useState('');
    const debouncedSearchTerm = useDebounce(inputValue, delay);

    const [isOpen, toggleIsOpen] = useToggle();
    const [isOnScrollbar, toggleIsOnScrollbar] = useToggle();
    const [isLoading, toggleIsLoading] = useToggle();

    const creatableItemJSX = useMemo(() => {
        const isOptionWithInputValueExists = isOptionsExist(options, [{ value: inputValue, label: inputValue }]);
        const isSelectedMatchesInputValue = selected.find((s) => {
            return s.value === inputValue;
        });
        if (!creatable || isOptionWithInputValueExists || isSelectedMatchesInputValue) {
            return undefined;
        }

        const isSyncCreatable = !onSearch && inputValue.length > 0;
        const isAsyncCreatable = onSearch && debouncedSearchTerm.length > 0 && !isLoading;
        if (isSyncCreatable || isAsyncCreatable) {
            return (
                <MultiSelectCreatableItem<TOption>
                    inputValue={inputValue}
                    selected={selected}
                    maxSelected={maxSelected}
                    onInputValueChange={setInputValue}
                    onMaxSelected={onMaxSelected}
                    onChange={onChange}
                    onSelectedChange={setSelected}
                />
            );
        }

        return undefined;
    }, [
        options,
        inputValue,
        selected,
        creatable,
        onSearch,
        debouncedSearchTerm.length,
        isLoading,
        maxSelected,
        onMaxSelected,
        onChange,
    ]);

    const emptyItemJSX = useMemo(() => {
        if (!emptyIndicator) {
            return undefined;
        }

        // For async search that showing emptyIndicator
        if (onSearch && !creatable && Object.keys(options).length === 0) {
            return (
                <CommandItem value="-" disabled>
                    {emptyIndicator}
                </CommandItem>
            );
        }

        return <MultiSelectCommandEmpty>{emptyIndicator}</MultiSelectCommandEmpty>;
    }, [creatable, emptyIndicator, onSearch, options]);

    const selectables = useMemo<MultiSelectGroupOption<TOption>>(() => {
        return removePickedOption(options, selected);
    }, [options, selected]);

    useImperativeHandle(ref, () => {
        return {
            selectedValue: [...selected],
            input: inputRef.current as HTMLInputElement,
            focus() {
                return inputRef?.current?.focus();
            },
            reset() {
                return setSelected([]);
            },
        };
    }, [selected]);

    const clickOutsideHandler = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                toggleIsOpen(false);
                inputRef.current.blur();
            }
        },
        [toggleIsOpen]
    );

    const deselectHandler = useCallback(
        (option: MultiSelectOption) => {
            const newOptions = selected.filter((s) => {
                return s.value !== option.value;
            });
            setSelected(newOptions);
            onChange?.(newOptions);
        },
        [onChange, selected]
    );

    const syncSearch = useCallback(() => {
        const res = onSearchSync?.(debouncedSearchTerm);

        setOptions(transToGroupOption(res || [], groupBy));
    }, [debouncedSearchTerm, groupBy, onSearchSync]);

    const asyncSearch = useCallback(async () => {
        toggleIsLoading(true);

        const res = await onSearch?.(debouncedSearchTerm);

        setOptions(transToGroupOption(res || [], groupBy));
        toggleIsLoading(false);
    }, [debouncedSearchTerm, groupBy, onSearch, toggleIsLoading]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    if (input.value === '' && selected.length > 0) {
                        const lastSelectOption = selected[selected.length - 1];
                        // If last item is fixed, we should not remove it.
                        if (!lastSelectOption.fixed) {
                            deselectHandler(selected[selected.length - 1]);
                        }
                    }
                }
                // This is not a default behavior of the <input /> field
                if (e.key === 'Escape') {
                    input.blur();
                }
            }
        },
        [deselectHandler, selected]
    );

    const commandKeyDownHandler = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            handleKeyDown(event);
            commandProps?.onKeyDown?.(event);
        },
        [handleKeyDown, commandProps?.onKeyDown]
    );

    const commandInnerClickHandler = useCallback(() => {
        if (disabled) {
            return;
        }

        inputRef?.current?.focus();
    }, [disabled, inputRef]);

    /** Avoid Creatable Selector freezing or lagging when paste a long string. */
    const commandFilter = useCallback(() => {
        if (commandProps?.filter) {
            return commandProps.filter;
        }

        if (creatable) {
            return (value: string, search: string) => {
                return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
            };
        }
        // Using default filter in `cmdk`. We don&lsquo;t have to provide it.
        return undefined;
    }, [creatable, commandProps?.filter]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', clickOutsideHandler);
            document.addEventListener('touchend', clickOutsideHandler);
        } else {
            document.removeEventListener('mousedown', clickOutsideHandler);
            document.removeEventListener('touchend', clickOutsideHandler);
        }

        return () => {
            document.removeEventListener('mousedown', clickOutsideHandler);
            document.removeEventListener('touchend', clickOutsideHandler);
        };
    }, [clickOutsideHandler, isOpen]);

    useEffect(() => {
        if (value) {
            setSelected(value);
        }
    }, [value]);

    useEffect(() => {
        /** If `onSearch` is provided, do not trigger options updated. */
        if (!arrayOptions || onSearch) {
            return;
        }
        const newOption = transToGroupOption(arrayOptions || [], groupBy);
        if (JSON.stringify(newOption) !== JSON.stringify(options)) {
            setOptions(newOption);
        }
    }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options]);

    // TODO: 😕
    useEffect(() => {
        /** sync search */

        const exec = () => {
            if (!onSearchSync || !isOpen) {
                return;
            }

            if (triggerSearchOnFocus || debouncedSearchTerm) {
                syncSearch();
            }
        };

        void exec();
    }, [debouncedSearchTerm, groupBy, isOpen, triggerSearchOnFocus]);

    // TODO: 😕
    useEffect(() => {
        /** async search */

        const exec = async () => {
            if (!onSearch || !isOpen) {
                return;
            }

            if (triggerSearchOnFocus || debouncedSearchTerm) {
                await asyncSearch();
            }
        };

        void exec();
    }, [debouncedSearchTerm, groupBy, isOpen, triggerSearchOnFocus]);

    return (
        <Command
            ref={dropdownRef}
            {...commandProps}
            onKeyDown={commandKeyDownHandler}
            className={cn('h-auto overflow-visible bg-transparent', commandProps?.className)}
            // When onSearch is provided, we don&lsquo;t want to filter the options. You can still override it.
            shouldFilter={commandProps?.shouldFilter !== undefined ? commandProps.shouldFilter : !onSearch}
            filter={commandFilter()}
        >
            <div
                className={cn(
                    'relative min-h-[40x] rounded-lg border border-input text-sm transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
                    {
                        'p-[5px]': selected.length !== 0,
                        'cursor-text': !disabled && selected.length !== 0,
                    },
                    !hideClearAllButton && 'pe-9',
                    className
                )}
                onClick={commandInnerClickHandler}
            >
                <div className="flex flex-wrap gap-1">
                    {selected.map((option) => {
                        return (
                            <div
                                key={option.value}
                                className={cn(
                                    'animate-fadeIn relative inline-flex h-7 cursor-default items-center rounded-md border border-solid bg-background pe-7 pl-2 ps-2 text-xs font-medium text-secondary-foreground transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-50 data-[fixed]:pe-2',
                                    badgeClassName
                                )}
                                data-fixed={option.fixed}
                                data-disabled={disabled || undefined}
                            >
                                {renderOption ? renderOption(option) : option.label}
                                <button
                                    className="absolute -inset-y-px -end-px flex size-7 items-center justify-center rounded-e-lg border border-transparent p-0 text-muted-foreground/80 outline-0 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            deselectHandler(option);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => {
                                        return deselectHandler(option);
                                    }}
                                    aria-label="Remove"
                                >
                                    <XIcon size={14} strokeWidth={2} aria-hidden="true" />
                                </button>
                            </div>
                        );
                    })}
                    {/* Avoid having the "Search" Icon */}
                    <CommandPrimitive.Input
                        {...inputProps}
                        ref={inputRef}
                        value={inputValue}
                        disabled={disabled}
                        onValueChange={(value) => {
                            setInputValue(value);
                            inputProps?.onValueChange?.(value);
                        }}
                        onBlur={(event) => {
                            if (!isOnScrollbar) {
                                toggleIsOpen(false);
                            }
                            inputProps?.onBlur?.(event);
                        }}
                        onFocus={(event) => {
                            toggleIsOpen(true);
                            if (triggerSearchOnFocus) {
                                onSearch?.(debouncedSearchTerm);
                            }
                            inputProps?.onFocus?.(event);
                        }}
                        placeholder={hidePlaceholderWhenSelected && selected.length !== 0 ? '' : placeholder}
                        className={cn(
                            'flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed text-base md:text-sm',
                            {
                                'w-full': hidePlaceholderWhenSelected,
                                'px-3 py-[9px]': selected.length === 0,
                                'ml-1': selected.length !== 0,
                            },
                            inputProps?.className
                        )}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setSelected(
                                selected.filter((s) => {
                                    return s.fixed;
                                })
                            );
                            onChange?.(
                                selected.filter((s) => {
                                    return s.fixed;
                                })
                            );
                        }}
                        className={cn(
                            'absolute end-0 top-0 flex size-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70',
                            (hideClearAllButton ||
                                disabled ||
                                selected.length < 1 ||
                                selected.filter((s) => {
                                    return s.fixed;
                                }).length === selected.length) &&
                                'hidden'
                        )}
                        aria-label="Clear all"
                    >
                        <XIcon size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div className="relative w-full ">
                <div
                    className={cn(
                        'absolute top-2 z-10 w-full overflow-hidden rounded-lg border border-input ',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                        !isOpen && 'hidden'
                    )}
                    data-state={isOpen ? 'open' : 'closed'}
                >
                    {isOpen && (
                        <CommandList
                            className="relative w-full flex bg-popover text-popover-foreground shadow-lg shadow-black/5 outline-none "
                            onMouseLeave={() => {
                                toggleIsOnScrollbar(false);
                            }}
                            onMouseEnter={() => {
                                toggleIsOnScrollbar(true);
                            }}
                            onMouseUp={() => {
                                inputRef?.current?.focus();
                            }}
                        >
                            {isLoading ? (
                                loadingIndicator
                            ) : (
                                <ScrollArea className="relative h-full flex flex-1 w-full max-h-80" type="always">
                                    {emptyItemJSX}
                                    {creatableItemJSX}
                                    {!selectFirstItem && <CommandItem value="-" className="hidden" />}
                                    {Object.entries(selectables).map(([key, dropdowns]) => {
                                        return (
                                            <CommandGroup key={key} heading={key} className="h-full overflow-auto">
                                                <>
                                                    {dropdowns.map((option) => {
                                                        return (
                                                            <CommandItem
                                                                key={option.value}
                                                                value={option.label}
                                                                disabled={option.disable}
                                                                onMouseDown={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                }}
                                                                onSelect={() => {
                                                                    if (selected.length >= maxSelected) {
                                                                        onMaxSelected?.(selected.length);
                                                                        return;
                                                                    }
                                                                    setInputValue('');
                                                                    const newOptions = [
                                                                        ...selected,
                                                                        option,
                                                                    ] as TOption[];
                                                                    setSelected(newOptions);
                                                                    onChange?.(newOptions);
                                                                }}
                                                                className={cn(
                                                                    'cursor-pointer',
                                                                    option.disable && 'cursor-not-allowed opacity-50'
                                                                )}
                                                            >
                                                                {renderOption ? renderOption(option) : option.label}
                                                            </CommandItem>
                                                        );
                                                    })}
                                                </>
                                            </CommandGroup>
                                        );
                                    })}
                                </ScrollArea>
                            )}
                        </CommandList>
                    )}
                </div>
            </div>
        </Command>
    );
};

MultipleSelector.displayName = 'MultipleSelector';
export default MultipleSelector;
