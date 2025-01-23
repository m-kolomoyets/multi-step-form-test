import { Command as CommandPrimitive } from 'cmdk';
import { SearchIcon } from 'lucide-react';
import type { DialogProps } from '@radix-ui/react-dialog';
import type {
    CommandEmptyProps,
    CommandGroupProps,
    CommandInputProps,
    CommandItemProps,
    CommandListProps,
    CommandProps,
    CommandSeparatorProps,
    CommandShortcutProps,
} from './types';
import { cn } from '@/utils/cn';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/ui/Dialog';

const Command: React.FC<CommandProps> = ({ className, ...rest }) => {
    return (
        <CommandPrimitive
            className={cn(
                'flex h-full w-full flex-col overflow-hidden rounded-lg bg-popover text-popover-foreground',
                className
            )}
            {...rest}
        />
    );
};
Command.displayName = CommandPrimitive.displayName;

const CommandDialog: React.FC<DialogProps> = ({ children, ...rest }) => {
    return (
        <Dialog {...rest}>
            <DialogTitle />
            <DialogDescription />
            <DialogContent className="overflow-hidden p-0 sm:max-w-lg [&>button:last-child]:hidden">
                <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2">
                    {children}
                </Command>
            </DialogContent>
        </Dialog>
    );
};

const CommandEmpty: React.FC<CommandEmptyProps> = ({ className, ...rest }) => {
    return <CommandPrimitive.Empty className={cn('py-6 text-center text-sm', className)} {...rest} />;
};
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup: React.FC<CommandGroupProps> = ({ className, ...rest }) => {
    return (
        <CommandPrimitive.Group
            className={cn(
                'overflow-hidden p-2 text-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
                className
            )}
            {...rest}
        />
    );
};
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandInput: React.FC<CommandInputProps> = ({ className, ...rest }) => {
    return (
        <div className="flex items-center border-b border-input px-5" cmdk-input-wrapper="">
            <SearchIcon size={20} strokeWidth={2} className="me-3 text-muted-foreground/80" />
            <CommandPrimitive.Input
                className={cn(
                    'flex h-10 w-full rounded-lg bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...rest}
            />
        </div>
    );
};
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandItem: React.FC<CommandItemProps> = ({ className, ...rest }) => {
    return (
        <CommandPrimitive.Item
            className={cn(
                'relative flex cursor-default select-none items-center gap-3 rounded-md px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
                className
            )}
            {...rest}
        />
    );
};
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandList: React.FC<CommandListProps> = ({ className, ...rest }) => {
    return (
        <CommandPrimitive.List
            className={cn('max-h-80 overflow-y-auto overflow-x-hidden [&>div]:w-full', className)}
            {...rest}
        />
    );
};
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandSeparator: React.FC<CommandSeparatorProps> = ({ className, ...rest }) => {
    return <CommandPrimitive.Separator className={cn('-mx-1 h-px bg-border', className)} {...rest} />;
};
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandShortcut: React.FC<CommandShortcutProps> = ({ className, ...rest }) => {
    return (
        <kbd
            className={cn(
                '-me-1 ms-auto inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70',
                className
            )}
            {...rest}
        />
    );
};
CommandShortcut.displayName = 'CommandShortcut';

export {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
};
