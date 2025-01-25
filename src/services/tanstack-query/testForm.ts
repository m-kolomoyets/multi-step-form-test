import { TEST_FORM_MUTATION_KEYS } from './mutationKeys';
import { createCompany, createContact } from '@/services/api/testForm';
import { useMutation } from '@tanstack/react-query';

export type CreateContactResponse = {
    success: boolean;
};

export type CreateCompanyResponse = {
    success: boolean;
};

export const useCreateContact = () => {
    return useMutation<CreateContactResponse>({
        mutationKey: TEST_FORM_MUTATION_KEYS.createContact(),
        mutationFn: createContact,
    });
};

export const useCreateCompany = () => {
    return useMutation<CreateCompanyResponse>({
        mutationKey: TEST_FORM_MUTATION_KEYS.createCompany(),
        mutationFn: createCompany,
    });
};
