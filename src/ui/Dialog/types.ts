import {
    Content as DialogPrimitiveContent,
    Description as DialogPrimitiveDescription,
    Overlay as DialogPrimitiveOverlay,
    Title as DialogPrimitiveTitle,
} from '@radix-ui/react-dialog';

export type DialogContentProps = React.ComponentProps<typeof DialogPrimitiveContent>;
export type DialogOverlayProps = React.ComponentProps<typeof DialogPrimitiveOverlay>;
export type DialogDescriptionProps = React.ComponentProps<typeof DialogPrimitiveDescription>;
export type DialogFooterProps = React.ComponentProps<'div'>;
export type DialogHeaderProps = React.ComponentProps<'div'>;
export type DialogTitleProps = React.ComponentProps<typeof DialogPrimitiveTitle>;
