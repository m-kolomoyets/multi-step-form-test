import { z } from 'zod';
import type { MultiFormStepProps } from '../../types';
import { companyContactStepSchema } from './schemas';

export type CompanyDetailsStepValues = z.infer<typeof companyContactStepSchema>;

export type CompanyDetailsStepProps = MultiFormStepProps & {
    values: CompanyDetailsStepValues;
};
