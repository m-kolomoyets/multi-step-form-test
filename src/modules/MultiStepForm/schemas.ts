import { z } from 'zod';

export const multipleFormSearchParamsSchema = z.object({
    isSuccess: z.boolean().optional(),
});
