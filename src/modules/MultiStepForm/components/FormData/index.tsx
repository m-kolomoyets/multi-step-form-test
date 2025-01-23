import { memo } from 'react';
import Code from '@/components/Code';
import { Button } from '@/ui/Button';

type FormDataProps = {
    data: unknown;
    onStart: () => void;
};

const FormData: React.FC<FormDataProps> = ({ data, onStart }) => {
    return (
        <div className="relative flex h-full w-full items-center justify-center px-4 py-8">
            <div className="w-full max-w-md shrink-0 space-y-4">
                <div className="scrollbar-hide max-h-96 w-full overflow-auto rounded-3xl border border-neutral-800 bg-neutral-950 p-3">
                    <Code code={data} />
                </div>
                <Button type="button" onClick={onStart}>
                    Start Again
                </Button>
            </div>
        </div>
    );
};

export default memo(FormData);
