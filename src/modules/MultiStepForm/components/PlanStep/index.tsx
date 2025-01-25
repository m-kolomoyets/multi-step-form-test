import { memo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { PlanStepProps } from './types';
import { MultiStepFormController } from '@/components/MultiStepForm/context/MultiStepFormControllerContext';
import { PLAN_OPTIONS } from '@/constants';
import { planSchema } from './schemas';
import MultiStepFormLayout from '@/components/layouts/MultiStepFormLayout';
import MultiStepFormView from '@/components/MultiStepForm/components/MultiStepFormView';
import SelectField from '@/components/MultiStepForm/components/SelectField';
import Button from '@/ui/Button';

const PlanStep: React.FC<PlanStepProps> = ({ values, ...rest }) => {
    return (
        <MultiStepFormController {...rest}>
            <MultiStepFormView defaultValues={values} resolver={zodResolver(planSchema)}>
                <MultiStepFormLayout
                    key={rest.step}
                    heading={<strong>Select Plan</strong>}
                    description="Select the plan for this deal in the field below"
                    fields={[
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectField key="plan" name="plan" label="Plan" options={PLAN_OPTIONS} />
                        </div>,
                    ]}
                    button={<Button>Next</Button>}
                />
            </MultiStepFormView>
        </MultiStepFormController>
    );
};

export default memo(PlanStep);
