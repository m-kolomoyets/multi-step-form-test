import { z } from 'zod';
import type { MultiFormStepProps } from '../../types';
import { createContactStepSchema } from './schemas';

export type ContactDetailsStepValues = z.infer<typeof createContactStepSchema>;

export type ContactDetailsStepProps = MultiFormStepProps & {
    values: ContactDetailsStepValues;
};
