import { memo, useCallback } from 'react';
import { ContactDetailsStepProps, ContactDetailsStepValues } from './types';
import { useCreateContact } from '@/services/tanstack-query/testForm';
import { zodResolver } from '@hookform/resolvers/zod';
import type { MultiStepFormStepSubmitHandler } from '@/components/MultiStepForm/types';
import { MultiStepFormController } from '@/components/MultiStepForm/context/MultiStepFormControllerContext';
import { createContactStepSchema } from './schemas';
import MultiStepFormLayout from '@/components/layouts/MultiStepFormLayout';
import InputField from '@/components/MultiStepForm/components/InputField';
import MultiStepFormView from '@/components/MultiStepForm/components/MultiStepFormView';
import Button from '@/ui/Button';

const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({ values, ...rest }) => {
    const { mutate: createContact, isPending: isCreateContactPending } = useCreateContact();

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
                />
            </MultiStepFormView>
        </MultiStepFormController>
    );
};

export default memo(ContactDetailsStep);
