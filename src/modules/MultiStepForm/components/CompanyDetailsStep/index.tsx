import { memo, useCallback } from 'react';
import { CompanyDetailsStepProps, CompanyDetailsStepValues } from './types';
import { useCreateCompany } from '@/services/tanstack-query/testForm';
import { zodResolver } from '@hookform/resolvers/zod';
import type { MultiStepFormStepSubmitHandler } from '@/components/MultiStepForm/types';
import { MultiStepFormController } from '@/components/MultiStepForm/context/MultiStepFormControllerContext';
import { companyContactStepSchema } from './schemas';
import MultiStepFormLayout from '@/components/layouts/MultiStepFormLayout';
import BackButton from '@/components/MultiStepForm/components/BackButton';
import InputField from '@/components/MultiStepForm/components/InputField';
import MultiStepFormView from '@/components/MultiStepForm/components/MultiStepFormView';
import NumericInputField from '@/components/MultiStepForm/components/NumericInputField';
import Button from '@/ui/Button';

const CompanyDetailsStep: React.FC<CompanyDetailsStepProps> = ({ values, ...rest }) => {
    const { mutate: createCompany, isPending: isCreateCompanyPending } = useCreateCompany();

    const submitHandler = useCallback<MultiStepFormStepSubmitHandler<CompanyDetailsStepValues>>(
        (data, handlers) => {
            // eslint-disable-next-line no-console
            console.log('onSubmit', data);

            createCompany(undefined, {
                ...handlers,
                onError(error) {
                    // eslint-disable-next-line no-console
                    console.error('Error creating contact', error);
                },
            });
        },
        [createCompany]
    );

    return (
        <MultiStepFormController {...rest}>
            <MultiStepFormView
                defaultValues={values}
                resolver={zodResolver(companyContactStepSchema)}
                onSubmit={submitHandler}
            >
                <MultiStepFormLayout
                    key={rest.step}
                    heading={
                        <>
                            Company <strong>Corporate Information</strong>
                        </>
                    }
                    description="Complete the following fields to verify the Company's authenticity and access the personalized health benefits plan"
                    fields={[
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField<CompanyDetailsStepValues, 'companyName'>
                                key="companyName"
                                name="companyName"
                                label="Company Name"
                            />
                            <NumericInputField<CompanyDetailsStepValues, 'initialEmployees'>
                                key="initialEmployees"
                                name="initialEmployees"
                                label="Initial Employees"
                                allowNegative={false}
                                decimalScale={0}
                                thousandSeparator=","
                            />
                            <InputField<CompanyDetailsStepValues, 'address'>
                                key="address"
                                name="address"
                                label="Address"
                            />
                            <InputField<CompanyDetailsStepValues, 'city'> key="city" name="city" label="City" />
                            <InputField<CompanyDetailsStepValues, 'state'> key="state" name="state" label="State" />
                        </div>,
                    ]}
                    button={<Button isLoading={isCreateCompanyPending}>Next</Button>}
                    back={<BackButton />}
                />
            </MultiStepFormView>
        </MultiStepFormController>
    );
};

export default memo(CompanyDetailsStep);
