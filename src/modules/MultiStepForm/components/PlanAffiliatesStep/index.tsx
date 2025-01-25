import { memo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { PlanAffiliatesStepProps } from './types';
import { MultiStepFormController } from '@/components/MultiStepForm/context/MultiStepFormControllerContext';
import { AFFILIATES_OPTIONS } from './constants';
import { planAffiliatesStepSchema } from './schemas';
import MultiStepFormLayout from '@/components/layouts/MultiStepFormLayout';
import MultiStepFormView from '@/components/MultiStepForm/components/MultiStepFormView';
import UserSelectField from '@/components/MultiStepForm/components/UserSelectField';
import Button from '@/ui/Button';

const PlanAffiliatesStep: React.FC<PlanAffiliatesStepProps> = ({ values, ...rest }) => {
    return (
        <MultiStepFormController {...rest}>
            <MultiStepFormView
                defaultValues={values}
                resolver={zodResolver(planAffiliatesStepSchema)}
                // eslint-disable-next-line no-console
                onError={console.error}
            >
                <MultiStepFormLayout
                    key={rest.step}
                    heading={<strong>Originating Affiliate</strong>}
                    description="Use the search field below to find and select the originating affiliate for this deal."
                    fields={[
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <UserSelectField
                                key="affiliate"
                                name="affiliate"
                                label="Affiliate"
                                options={AFFILIATES_OPTIONS}
                            />
                        </div>,
                    ]}
                    button={<Button>Next</Button>}
                />
            </MultiStepFormView>
        </MultiStepFormController>
    );
};

export default memo(PlanAffiliatesStep);
