import { memo } from 'react';
import { TEST_FORM_MUTATION_KEYS } from '@/services/tanstack-query/mutationKeys';
import { CreateCompanyResponse } from '@/services/tanstack-query/testForm';
import { useMutationState } from '@tanstack/react-query';
import Code from '@/components/Code';
import Button from '@/ui/Button';

type FormDataProps = {
    data: unknown;
    onStart: () => void;
};

const FormData: React.FC<FormDataProps> = ({ data, onStart }) => {
    const [createCompanyMutationState] = useMutationState<CreateCompanyResponse>({
        filters: {
            mutationKey: TEST_FORM_MUTATION_KEYS.createCompany(),
        },
        select(state) {
            return state.state.data as CreateCompanyResponse;
        },
    });

    const isFormSuccess = createCompanyMutationState.success;

    return (
        <div className="relative flex h-full w-full items-center justify-center px-4 py-8">
            <div className="w-full max-w-md shrink-0 space-y-4">
                <h1 className="text-center text-2xl font-bold">
                    {isFormSuccess
                        ? 'Congratulations! You are qualified to apply for a loan'
                        : 'Thanks for your interest. We will contact you soon.'}
                </h1>
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
