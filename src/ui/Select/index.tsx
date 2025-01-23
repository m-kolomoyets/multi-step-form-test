import {
    Root as Select,
    Group as SelectGroup,
    Content as SelectPrimitiveContent,
    Icon as SelectPrimitiveIcon,
    Item as SelectPrimitiveItem,
    ItemIndicator as SelectPrimitiveItemIndicator,
    ItemText as SelectPrimitiveItemText,
    Label as SelectPrimitiveLabel,
    Portal as SelectPrimitivePortal,
    ScrollDownButton as SelectPrimitiveScrollDownButton,
    ScrollUpButton as SelectPrimitiveScrollUpButton,
    Separator as SelectPrimitiveSeparator,
    Trigger as SelectPrimitiveTrigger,
    Viewport as SelectPrimitiveViewport,
    Value as SelectValue,
} from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type {
    SelectContentProps,
    SelectItemProps,
    SelectLabelProps,
    SelectScrollDownButtonProps,
    SelectScrollUpButtonProps,
    SelectSeparatorProps,
    SelectTriggerProps,
} from './types';
import { cn } from '@/utils/cn';

const SelectScrollUpButton: React.FC<SelectScrollUpButtonProps> = ({ className, ...rest }) => {
    return (
        <SelectPrimitiveScrollUpButton
            className={cn('flex cursor-default items-center justify-center py-1', className)}
            {...rest}
        >
            <ChevronUpIcon className="h-4 w-4" />
        </SelectPrimitiveScrollUpButton>
    );
};
SelectScrollUpButton.displayName = SelectPrimitiveScrollUpButton.displayName;

const SelectScrollDownButton: React.FC<SelectScrollDownButtonProps> = ({ className, ...rest }) => {
    return (
        <SelectPrimitiveScrollDownButton
            className={cn('flex cursor-default items-center justify-center py-1', className)}
            {...rest}
        >
            <ChevronDownIcon className="h-4 w-4" />
        </SelectPrimitiveScrollDownButton>
    );
};

const SelectContent: React.FC<SelectContentProps> = ({ className, children, position = 'popper', ...rest }) => {
    return (
        <SelectPrimitivePortal>
            <SelectPrimitiveContent
                className={cn(
                    'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                    position === 'popper' &&
                        'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                    className
                )}
                position={position}
                {...rest}
            >
                <SelectScrollUpButton />
                <SelectPrimitiveViewport
                    className={cn(
                        'p-1',
                        position === 'popper' &&
                            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
                    )}
                >
                    {children}
                </SelectPrimitiveViewport>
                <SelectScrollDownButton />
            </SelectPrimitiveContent>
        </SelectPrimitivePortal>
    );
};
SelectContent.displayName = SelectPrimitiveContent.displayName;

const SelectItem: React.FC<SelectItemProps> = ({ className, children, ...rest }) => {
    return (
        <SelectPrimitiveItem
            className={cn(
                'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                className
            )}
            {...rest}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <SelectPrimitiveItemIndicator>
                    <CheckIcon className="h-4 w-4" />
                </SelectPrimitiveItemIndicator>
            </span>

            <SelectPrimitiveItemText>{children}</SelectPrimitiveItemText>
        </SelectPrimitiveItem>
    );
};
SelectItem.displayName = SelectPrimitiveItem.displayName;

const SelectLabel: React.FC<SelectLabelProps> = ({ className, ...rest }) => {
    return <SelectPrimitiveLabel className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)} {...rest} />;
};
SelectLabel.displayName = SelectPrimitiveLabel.displayName;

const SelectSeparator: React.FC<SelectSeparatorProps> = ({ className, ...rest }) => {
    return <SelectPrimitiveSeparator className={cn('-mx-1 my-1 h-px bg-muted', className)} {...rest} />;
};
SelectSeparator.displayName = SelectPrimitiveSeparator.displayName;

const SelectTrigger: React.FC<SelectTriggerProps> = ({ className, children, ...rest }) => {
    return (
        <SelectPrimitiveTrigger
            className={cn(
                'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
                className
            )}
            {...rest}
        >
            {children}
            <SelectPrimitiveIcon asChild>
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </SelectPrimitiveIcon>
        </SelectPrimitiveTrigger>
    );
};
SelectTrigger.displayName = SelectPrimitiveTrigger.displayName;

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectScrollUpButton,
    SelectScrollDownButton,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
};
