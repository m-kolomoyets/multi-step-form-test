import { z } from 'zod';
import { requiredStringSchema } from '@/schemas';

export const planAffiliatesStepSchema = z.object({
    affiliate: requiredStringSchema,
});
