import { memo } from 'react';
import type { MultiStepFormLayoutProps } from './types';

// NOTE: Provided from  https://github.com/martiserra99/formity-react-docs/blob/main/src/components/form-layout.tsx
const MultiStepFormLayout: React.FC<MultiStepFormLayoutProps> = ({
    heading,
    description,
    fields,
    button,
    back,
    ...rest
}) => {
    return (
        <div className="relative flex h-full w-full items-center justify-center px-4 py-8" {...rest}>
            <div className="w-full max-w-md shrink-0">
                <h1 className="mb-3  text-3xl font-medium ">{heading}</h1>
                <p className="mb-6 text-base text-muted-foreground">{description}</p>
                <div className="space-y-4 pt-2 mb-4">{fields}</div>
                {button}
            </div>
            {back && <div className="absolute left-4 top-5">{back}</div>}
        </div>
    );
};

export default memo(MultiStepFormLayout);
