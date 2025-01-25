import { z } from 'zod';
import { positiveIntegerSchema, requiredStringSchema } from '@/schemas';

export const companyContactStepSchema = z.object({
    companyName: requiredStringSchema,
    initialEmployees: positiveIntegerSchema,
    address: requiredStringSchema,
    city: requiredStringSchema,
    state: requiredStringSchema,
});
