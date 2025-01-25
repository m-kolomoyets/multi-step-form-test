import type { WithClassName } from '@/types';

export type ProgressBarProps = WithClassName<{
    total: number;
    current: number;
}>;
