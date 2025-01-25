import { z } from 'zod';

export const requiredStringSchema = z.string().min(1, { message: 'This field is required' });
export const emailSchema = requiredStringSchema.email({ message: 'Invalid email address' });
export const positiveNumberSchema = z
    .number({ required_error: 'This field is required' })
    .min(1, { message: 'This field must be a positive number' });
export const positiveIntegerSchema = z;
positiveNumberSchema.int({ message: 'This field must be a positive integer' });
export const yesNoSchema = z.boolean().default(false);
