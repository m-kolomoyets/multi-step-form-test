import { z } from 'zod';

export const requiredStringSchema = z.string().min(1, { message: 'This field is required' });
export const emailSchema = requiredStringSchema.email({ message: 'Invalid email address' });
export const positiveIntegerSchema = z
    .number({ required_error: 'This field is required' })
    .min(1, { message: 'This field must be a positive integer' })
    .int({ message: 'This field must be a positive integer' });
