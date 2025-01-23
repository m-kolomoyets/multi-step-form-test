import {
    Content as SelectPrimitiveContent,
    Item as SelectPrimitiveItem,
    Label as SelectPrimitiveLabel,
    ScrollDownButton as SelectPrimitiveScrollDownButton,
    ScrollUpButton as SelectPrimitiveScrollUpButton,
    Separator as SelectPrimitiveSeparator,
    Trigger as SelectPrimitiveTrigger,
} from '@radix-ui/react-select';

export type SelectContentProps = React.ComponentProps<typeof SelectPrimitiveContent>;
export type SelectScrollUpButtonProps = React.ComponentProps<typeof SelectPrimitiveScrollUpButton>;
export type SelectScrollDownButtonProps = React.ComponentProps<typeof SelectPrimitiveScrollDownButton>;
export type SelectItemProps = React.ComponentProps<typeof SelectPrimitiveItem>;
export type SelectLabelProps = React.ComponentProps<typeof SelectPrimitiveLabel>;
export type SelectSeparatorProps = React.ComponentProps<typeof SelectPrimitiveSeparator>;
export type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitiveTrigger>;
