import { z } from 'zod';
import type { Cond, Form, Switch, Variables } from '@formity/react';
import { emailSchema, positiveNumberSchema, requiredStringSchema, yesNoSchema } from '@/schemas';

export const goalsStepSchema = z.object({
    goal: z.enum(['improve-credit', 'pay-off-debt', 'both']),
});

/**
 * Main flow
 */
export const debtTypeStepSchema = z.object({
    debtType: z.enum(['credit-card', 'medical', 'loan', 'other']),
});

export const idealTermsStepSchema = z.object({
    idealTerms: z.enum(['fastest-payoff', 'lowest-monthly-payment', 'not-sure']),
});

export const estimatedCreditScoreStepSchema = z.object({
    estimatedCreditScore: z.enum(['great', 'good', 'fair', 'poor']),
});

export const howMuchFinancingLookingForStepSchema = z.object({
    howMuchFinancingLookingFor: z.enum(['$1,000-$10,000', '$10,000-$25,000', 'Over $25,000']),
});

export const annualIncomeStepSchema = z.object({
    annualIncome: positiveNumberSchema,
});

/**
 * Improve credit flow
 */
export const areYouInterestedInCreditScoreRestoreStepSchema = z.object({
    areYouInterestedInCreditScoreRestore: yesNoSchema,
});

export const creditGoalsStepSchema = z.object({
    creditGoals: z.enum([
        'buy-a-car',
        'buy-or-refinance-a-home',
        'consolidate-debts-at-a-lower-interest-rate',
        'other',
    ]),
});

export const howMotivatedAreYouToImproveYourCreditStepSchema = z.object({
    howMotivatedAreYouToImproveYourCredit: z.enum(['as-soon-as-possible', 'i-have-time', 'not-in-any-rush']),
});

/**
 * Common steps
 */
export const contactDetailsStepSchema = z.object({
    firstName: requiredStringSchema,
    lastName: requiredStringSchema,
    email: emailSchema,
    phone: requiredStringSchema,
});

export const addressStepSchema = z.object({
    address: requiredStringSchema,
    city: requiredStringSchema,
    state: requiredStringSchema,
    zip: requiredStringSchema,
});

/**
 * Restore credit score flow
 */
export const areYouInterestedInRestoringAndIncreasingCreditScoreStepSchema = z.object({
    areYouInterestedInRestoringAndIncreasingCreditScore: yesNoSchema,
});

export const howMotivatedAreYouToTransformCreditScoreStepSchema = z.object({
    howMotivatedAreYouToTransformCreditScore: z.enum(['Somewhat motivated', 'Motivated', 'Not motivated']),
});

/**
 * Schedule consultation flow
 */
export const scheduleConsultationStepSchema = z.object({
    date: z.date(),
    time: z.enum(['morning', 'afternoon', 'evening']),
});

/**
 * Form steps values types
 */

// === Common step ===
type GoalsStepValues = z.infer<typeof goalsStepSchema>;

// === Common flow ===
type DebtTypeStepValues = z.infer<typeof debtTypeStepSchema>;
type IdealTermsStepValues = z.infer<typeof idealTermsStepSchema>;
type EstimatedCreditScoreStepValues = z.infer<typeof estimatedCreditScoreStepSchema>;
type HowMuchFinancingLookingForStepValues = z.infer<typeof howMuchFinancingLookingForStepSchema>;
type AnnualIncomeStepValues = z.infer<typeof annualIncomeStepSchema>;

// === Improve credit flow ===
type AreYouInterestedInCreditScoreRestoreStepValues = z.infer<typeof areYouInterestedInCreditScoreRestoreStepSchema>;
type CreditGoalsStepValues = z.infer<typeof creditGoalsStepSchema>;
type HowMotivatedAreYouToImproveYourCreditStepValues = z.infer<typeof howMotivatedAreYouToImproveYourCreditStepSchema>;

// === Regular steps (after both flows)
type ContactDetailsStepValues = z.infer<typeof contactDetailsStepSchema>;
type AddressStepValues = z.infer<typeof addressStepSchema>;

// === Common flow response step
type CreditScoreResponse = {
    creditScore: [number, number];
    debtAmount: number;
};

// === Restore credit score flow ===
type AreYouInterestedInRestoringAndIncreasingCreditScoreStepValues = z.infer<
    typeof areYouInterestedInRestoringAndIncreasingCreditScoreStepSchema
>;
type HowMotivatedAreYouToTransformCreditScoreStepValues = z.infer<
    typeof howMotivatedAreYouToTransformCreditScoreStepSchema
>;

// === Schedule consultation flow ===
type ScheduleConsultationStepValues = z.infer<typeof scheduleConsultationStepSchema>;

export type TritonFinancialDebtFormValues = [
    Form<GoalsStepValues>,
    Cond<{
        then: [
            Form<AreYouInterestedInCreditScoreRestoreStepValues>,
            Form<CreditGoalsStepValues>,
            Form<HowMotivatedAreYouToImproveYourCreditStepValues>,
            Form<ContactDetailsStepValues>,
            Form<AddressStepValues>,
            Variables<CreditScoreResponse>,
            Switch<{
                branches: [
                    // User DID use “subid=dh“
                    // and the Check for Match response was TRUE
                    // and we successfully did “Send Lead” API call
                    [Form<CreditScoreResponse>],
                    // User did NOT use “subid=dh“
                    // AND the Check for Match response was TRUE
                    [
                        Switch<{
                            branches: [
                                // Array API response provides Credit score
                                // but no debt amount
                                // Show credit score from API response and use “Back to home page” button
                                [Form<CreditScoreResponse>],
                                // API response provides credit score & debt amount
                                // AND debt amount is between $10,000 and $20,000
                                // Show credit score and debt amount from API response.
                                // Show “Schedule a consultation” button that leads to the booking flow
                                // === OR
                                // Array API response provides credit score and debt amount
                                // AND debt amount is equal or greater than $20,000
                                // Show credit score and debt amount from API response.
                                // Show “Schedule a consultation” that leads to the booking flow
                                // and a “Call now” button (+1 833-884-4111)
                                [
                                    Form<CreditScoreResponse>,
                                    Form<ScheduleConsultationStepValues>,
                                    Form<CreditScoreResponse>,
                                ],
                            ];
                            // No response from Array API and Database Match is true
                            // Use “Back to home page” button
                            default: [Form<CreditScoreResponse>];
                        }>,
                    ],
                    // User DID use “subid=dh“
                    // AND Check for Match response was false
                    // OR
                    // User did NOT use “subid=dh“
                    // AND Check for Match response was false
                    [
                        Switch<{
                            branches: [
                                // Array API response provides only credit score
                                // but no debt amount
                                // and credit score is over 750
                                // Show credit score from API response and use “Back to home page” button
                                // === OR
                                // API response provides credit score & debt amount
                                // AND debt amount is between $0 and $10,000
                                // AND credit score is over 750
                                // Show credit score and debt amount from API response.
                                // Show “Back to home page” button
                                [Form<CreditScoreResponse>],
                                // Array API response provides Credit score
                                // but no debt amount
                                // AND credit score is less than 750
                                // Show credit score from API response and use “Back to home page” button
                                // === OR
                                // API response provides credit score & debt amount
                                // AND debt amount is between $0 and $10,000
                                // AND credit score is less than 750
                                // Show credit score and debt amount from API response.
                                // Show “Back to home page” button
                                [
                                    Form<CreditScoreResponse>,
                                    Form<AreYouInterestedInRestoringAndIncreasingCreditScoreStepValues>,
                                    Form<HowMotivatedAreYouToTransformCreditScoreStepValues>,
                                    Form<CreditScoreResponse>,
                                ],
                                // API response provides credit score & debt amount
                                //  AND debt amount is between $10,000 and $20,000
                                // Show credit score and debt amount from API response.
                                // Show “Schedule a consultation” button that leads to the booking flow
                                // === OR
                                // API response provides credit score
                                // and debt amount AND debt amount is equal or greater than $20,000
                                // Show credit score and debt amount from API response.
                                // Show “Schedule a consultation” that leads to the booking flow
                                // and a “Call now” button (+1 833-884-4111)
                                [
                                    Form<CreditScoreResponse>,
                                    Form<ScheduleConsultationStepValues>,
                                    Form<CreditScoreResponse>,
                                ],
                            ];
                            // No response from Array API
                            // Use “Back to home page” button
                            default: [Form<CreditScoreResponse>];
                        }>,
                    ],
                ];
                default: [Form<CreditScoreResponse>];
            }>,
        ];
        else: [
            Form<DebtTypeStepValues>,
            Form<IdealTermsStepValues>,
            Form<EstimatedCreditScoreStepValues>,
            Form<HowMuchFinancingLookingForStepValues>,
            Form<AnnualIncomeStepValues>,
            Form<ContactDetailsStepValues>,
            Form<AddressStepValues>,
            Form<CreditScoreResponse>,
        ];
    }>,
];
