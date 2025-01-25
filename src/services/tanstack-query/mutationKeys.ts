export const TEST_FORM_MUTATION_KEYS = {
    all: ['test-form', 'mutation'] as const,
    createContact() {
        return [...TEST_FORM_MUTATION_KEYS.all, 'create-contact'] as const;
    },
    createCompany() {
        return [...TEST_FORM_MUTATION_KEYS.all, 'create-company'] as const;
    },
};
