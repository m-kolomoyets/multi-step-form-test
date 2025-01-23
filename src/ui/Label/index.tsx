import { memo } from 'react';
import { Root as LabelPrimitiveRoot } from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

type LabelProps = React.ComponentProps<typeof LabelPrimitiveRoot> & VariantProps<typeof labelVariants>;

const Label: React.FC<LabelProps> = ({ className, ...props }) => {
    return <LabelPrimitiveRoot className={cn(labelVariants(), className)} {...props} />;
};
Label.displayName = LabelPrimitiveRoot.displayName;

export default memo(Label);
