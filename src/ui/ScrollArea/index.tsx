import {
    Corner as ScrollAreaPrimitiveCorner,
    Root as ScrollAreaPrimitiveRoot,
    ScrollAreaScrollbar as ScrollAreaPrimitiveScrollbar,
    ScrollAreaThumb as ScrollAreaPrimitiveScrollbarThumb,
    Viewport as ScrollAreaPrimitiveViewport,
} from '@radix-ui/react-scroll-area';
import type { ScrollAreaProps, ScrollAreaScrollBarProps } from './types';
import { cn } from '@/utils/cn';

const ScrollArea: React.FC<ScrollAreaProps> = ({ className, children, ...rest }) => {
    return (
        <ScrollAreaPrimitiveRoot className={cn('relative overflow-hidden', className)} {...rest}>
            <ScrollAreaPrimitiveViewport className="h-full w-full rounded-[inherit]">
                {children}
            </ScrollAreaPrimitiveViewport>
            <ScrollBar />
            <ScrollAreaPrimitiveCorner />
        </ScrollAreaPrimitiveRoot>
    );
};
ScrollArea.displayName = ScrollAreaPrimitiveRoot.displayName;

const ScrollBar: React.FC<ScrollAreaScrollBarProps> = ({ className, orientation = 'vertical', ...rest }) => {
    return (
        <ScrollAreaPrimitiveScrollbar
            orientation={orientation}
            className={cn(
                'flex touch-none select-none transition-colors',
                orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
                orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
                className
            )}
            {...rest}
        >
            <ScrollAreaPrimitiveScrollbarThumb className="relative flex-1 rounded-full bg-border" />
        </ScrollAreaPrimitiveScrollbar>
    );
};
ScrollBar.displayName = ScrollAreaPrimitiveScrollbar.displayName;

export { ScrollArea, ScrollBar };
