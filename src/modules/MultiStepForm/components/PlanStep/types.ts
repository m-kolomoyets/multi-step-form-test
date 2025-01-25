import { z } from 'zod';
import type { MultiFormStepProps } from '../../types';
import { planSchema } from './schemas';

export type PlanStepValues = z.infer<typeof planSchema>;

export type PlanStepProps = MultiFormStepProps & {
    values: PlanStepValues;
};
