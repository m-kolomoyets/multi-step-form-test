import { memo } from 'react';
import { WithClassName } from '@/types';
import { LoaderCircleIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

const Loader: React.FC<WithClassName> = ({ className }) => {
    return <LoaderCircleIcon className={cn('animate-spin', className)} />;
};

export default memo(Loader);
