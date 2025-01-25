import { z } from 'zod';
import { emailSchema, requiredStringSchema } from '@/schemas';

export const createContactStepSchema = z.object({
    firstName: requiredStringSchema,
    lastName: requiredStringSchema,
    email: emailSchema,
});
