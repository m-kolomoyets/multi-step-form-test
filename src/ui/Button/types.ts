import type { Slottable } from '@/types';
import type { VariantProps } from 'class-variance-authority';
import { BUTTON_VARIANTS } from './constants';

export type ButtonProps = React.ComponentProps<'button'> &
    VariantProps<typeof BUTTON_VARIANTS> &
    Slottable & {
        /**
         * If true, the button will be disabled and show a loading spinner
         */
        isLoading?: boolean;
    };
