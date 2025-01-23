import { Command as CommandPrimitive } from 'cmdk';

export type CommandProps = React.ComponentProps<typeof CommandPrimitive>;
export type CommandEmptyProps = React.ComponentProps<typeof CommandPrimitive.Empty>;
export type CommandGroupProps = React.ComponentProps<typeof CommandPrimitive.Group>;
export type CommandInputProps = React.ComponentProps<typeof CommandPrimitive.Input>;
export type CommandItemProps = React.ComponentProps<typeof CommandPrimitive.Item>;
export type CommandListProps = React.ComponentProps<typeof CommandPrimitive.List>;
export type CommandSeparatorProps = React.ComponentProps<typeof CommandPrimitive.Separator>;
export type CommandShortcutProps = React.ComponentProps<'span'>;
