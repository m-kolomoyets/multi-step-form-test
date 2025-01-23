import { memo } from 'react';
import { useCommandState } from 'cmdk';
import type { MultiSelectCommandEmptyProps } from './types';
import { cn } from '@/utils/cn';

/**
 * The `CommandEmpty` of shadcn/ui will cause the cmdk empty not rendering correctly.
 * So we create one and copy the `Empty` implementation from `cmdk`.
 *
 * @reference: https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 **/
const MultiSelectCommandEmpty: React.FC<MultiSelectCommandEmptyProps> = ({ className, ...rest }) => {
    const render = useCommandState((state) => {
        return state.filtered.count === 0;
    });

    if (!render) return null;

    return (
        <div className={cn('px-2 py-4 text-center text-sm', className)} cmdk-empty="" role="presentation" {...rest} />
    );
};

MultiSelectCommandEmpty.displayName = 'CommandEmpty';

export default memo(MultiSelectCommandEmpty);
