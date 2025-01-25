import { memo } from 'react';
import { Slot } from '@radix-ui/react-slot';
import type { ButtonProps } from './types';
import { cn } from '@/utils/cn';
import { BUTTON_VARIANTS } from './constants';
import Loader from '@/ui/Loader';

const Button: React.FC<ButtonProps> = ({
    className,
    children,
    variant,
    size,
    isLoading,
    disabled,
    asChild = false,
    ...rest
}) => {
    const Component = asChild ? Slot : 'button';

    return (
        <Component
            className={cn([BUTTON_VARIANTS({ variant, size }), 'relative', className])}
            disabled={disabled || isLoading}
            {...rest}
        >
            {isLoading ? (
                <span>
                    {/**
                     * NOTE: https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/_internal/base-button.tsx
                     * We need a wrapper to set `visibility: hidden`
                     * to hide the button content whilst we show the `Spinner`.
                     * The button is a flex container with a `gap`,
                     * so we use `display: contents` to ensure the correct flex layout.
                     *
                     * However, `display: contents` removes the content from the accessibility tree in some browsers,
                     * so we force remove it with `aria-hidden` and re-add it in the tree with `VisuallyHidden`
                     */}
                    <span className="contents invisible">{children}</span>
                    <span className="sr-only">{children}</span>
                    <span className="flex justify-center items-center absolute inset-0">
                        <Loader />
                    </span>
                </span>
            ) : (
                children
            )}
        </Component>
    );
};
Button.displayName = 'Button';

export default memo(Button);
