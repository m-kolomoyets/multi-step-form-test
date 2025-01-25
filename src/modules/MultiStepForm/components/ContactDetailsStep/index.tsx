import { memo, useCallback } from 'react';
import { ContactDetailsStepProps, ContactDetailsStepValues } from './types';
import { useCreateContact } from '@/services/tanstack-query/testForm';
import { zodResolver } from '@hookform/resolvers/zod';
import type { MultiStepFormStepSubmitHandler } from '@/components/MultiStepForm/types';
import { MultiStepFormController } from '@/components/MultiStepForm/context/MultiStepFormControllerContext';
import { PLAN_IDS } from '@/constants';
import { createContactStepSchema } from './schemas';
import MultiStepFormLayout from '@/components/layouts/MultiStepFormLayout';
import BackButton from '@/components/MultiStepForm/components/BackButton';
import InputField from '@/components/MultiStepForm/components/InputField';
import MultiStepFormView from '@/components/MultiStepForm/components/MultiStepFormView';
import ProgressBar from '@/components/MultiStepForm/components/ProgressBar';
import Button from '@/ui/Button';

const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({ values, inputs, ...rest }) => {
    const { mutate: createContact, isPending: isCreateContactPending } = useCreateContact();

    const total = inputs?.plan === PLAN_IDS.pro ? 5 : 4;
    const current = inputs?.plan === PLAN_IDS.pro ? 3 : 2;

    const submitHandler = useCallback<MultiStepFormStepSubmitHandler<ContactDetailsStepValues>>(
        (data, handlers) => {
            // eslint-disable-next-line no-console
            console.log('onSubmit', data);

            createContact(undefined, {
                ...handlers,
                onError(error) {
                    // eslint-disable-next-line no-console
                    console.error('Error creating contact', error);
                },
            });
        },
        [createContact]
    );

    return (
        <>
            <ProgressBar total={total} current={current} />
            <MultiStepFormController {...rest}>
                <MultiStepFormView
                    defaultValues={values}
                    resolver={zodResolver(createContactStepSchema)}
                    onSubmit={submitHandler}
                >
                    <MultiStepFormLayout
                        key={rest.step}
                        heading={
                            <>
                                Company <strong>Contact Info</strong>
                            </>
                        }
                        description="Complete the following fields so we know who to connect with"
                        fields={[
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField key="firstName" name="firstName" label="First Name" />
                                <InputField key="lastName" name="lastName" label="Last Name" />
                                <InputField key="email" name="email" label="Email" />
                            </div>,
                        ]}
                        button={<Button isLoading={isCreateContactPending}>Next</Button>}
                        back={<BackButton />}
                    />
                </MultiStepFormView>
            </MultiStepFormController>
        </>
    );
};

export default memo(ContactDetailsStep);
