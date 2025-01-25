import { z } from 'zod';
import { PLAN_IDS } from '@/constants';

export const planSchema = z.object({
    plan: z.enum([PLAN_IDS.basic, PLAN_IDS.pro]),
});
