import { z } from 'zod';
import type { MultiFormStepProps } from '../../types';
import { planAffiliatesStepSchema } from './schemas';

export type PlanAffiliatesStepValues = z.infer<typeof planAffiliatesStepSchema>;

export type PlanAffiliatesStepProps = MultiFormStepProps & {
    values: PlanAffiliatesStepValues;
};
