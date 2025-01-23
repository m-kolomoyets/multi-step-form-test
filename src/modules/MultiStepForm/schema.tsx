import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Cond, Form, Return, Schema } from '@formity/react';
import { MultiStepFormController } from '@/components/MultiStepForm/context/MultiStepFormControllerContext';
import MultiStepFormLayout from '@/components/layouts/MultiStepFormLayout';
import MultiSelectField from '@/components/MultiStepForm/components/MultiSelectField';
import MultiStepFormView from '@/components/MultiStepForm/components/MultiStepFormView';
import SelectField from '@/components/MultiStepForm/components/SelectField';
import YesNoField from '@/components/MultiStepForm/components/YesNoField';
import { Button } from '@/ui/Button';

const softwareDeveloperStepSchema = z.object({
    softwareDeveloper: z.boolean(),
});
const languagesStepSchema = z.object({
    languages: z.array(z.string()),
});
const interestedStepSchema = z.object({
    interested: z.string(),
});

const softwareDeveloperStepSchemaResolver = zodResolver(softwareDeveloperStepSchema);
const languagesStepSchemaResolver = zodResolver(languagesStepSchema);
const interestedStepSchemaResolver = zodResolver(interestedStepSchema);

type SoftwareDeveloperStepSchema = z.infer<typeof softwareDeveloperStepSchema>;
type LanguagesStepSchema = z.infer<typeof languagesStepSchema>;
type InterestedStepSchema = z.infer<typeof interestedStepSchema>;

export type MultiStepFormValues = [
    Form<SoftwareDeveloperStepSchema>,
    Cond<{
        then: [
            Form<LanguagesStepSchema>,
            Return<{
                softwareDeveloper: boolean;
                languages: string[];
            }>,
        ];
        else: [
            Form<InterestedStepSchema>,
            Return<{
                softwareDeveloper: boolean;
                interested: string;
            }>,
        ];
    }>,
];

export const multiStepFormSchema: Schema<MultiStepFormValues> = [
    {
        form: {
            values() {
                return {
                    softwareDeveloper: [true, []],
                };
            },
            render({ values, onNext, onBack, getState, setState }) {
                return (
                    <MultiStepFormController
                        step="softwareDeveloper"
                        onNext={onNext}
                        onBack={onBack}
                        getState={getState}
                        setState={setState}
                    >
                        <MultiStepFormView defaultValues={values} resolver={softwareDeveloperStepSchemaResolver}>
                            <MultiStepFormLayout
                                heading="Are you a software developer?"
                                description="We would like to know if you are a software developer"
                                fields={[
                                    <YesNoField
                                        key="softwareDeveloper"
                                        name="softwareDeveloper"
                                        label="Software Developer"
                                    />,
                                ]}
                                button={<Button>Next</Button>}
                            />
                        </MultiStepFormView>
                    </MultiStepFormController>
                );
            },
        },
    },
    {
        cond: {
            if({ softwareDeveloper }) {
                return softwareDeveloper;
            },
            then: [
                {
                    form: {
                        values() {
                            return {
                                languages: [[], []],
                            };
                        },
                        render({ values, onNext, onBack, getState, setState }) {
                            return (
                                <MultiStepFormController
                                    step="languages"
                                    onNext={onNext}
                                    onBack={onBack}
                                    getState={getState}
                                    setState={setState}
                                >
                                    <MultiStepFormView defaultValues={values} resolver={languagesStepSchemaResolver}>
                                        <MultiStepFormLayout
                                            heading="What are your favourite programming languages?"
                                            description="We would like to know which of the following programming languages you like the most"
                                            fields={[
                                                <MultiSelectField
                                                    key="languages"
                                                    name="languages"
                                                    label="Languages"
                                                    placeholder="Select languages"
                                                    options={[
                                                        { value: 'javascript', label: 'JavaScript' },
                                                        { value: 'python', label: 'Python' },
                                                        { value: 'go', label: 'Go' },
                                                    ]}
                                                />,
                                            ]}
                                            button={<Button>Next</Button>}
                                            back={<Button variant="secondary">Back</Button>}
                                        />
                                    </MultiStepFormView>
                                </MultiStepFormController>
                            );
                        },
                    },
                },
                {
                    return({ softwareDeveloper, languages }) {
                        return {
                            softwareDeveloper,
                            languages,
                        };
                    },
                },
            ],
            else: [
                {
                    form: {
                        values() {
                            return {
                                interested: ['maybe', []],
                            };
                        },
                        render({ values, onNext, onBack, getState, setState }) {
                            return (
                                <MultiStepFormController
                                    step="interested"
                                    onNext={onNext}
                                    onBack={onBack}
                                    getState={getState}
                                    setState={setState}
                                >
                                    <MultiStepFormView defaultValues={values} resolver={interestedStepSchemaResolver}>
                                        <MultiStepFormLayout
                                            heading="Would you be interested in learning how to code?"
                                            description="Having coding skills can be very beneficial"
                                            fields={[
                                                <SelectField
                                                    key="interested"
                                                    name="interested"
                                                    label="Interested"
                                                    options={[
                                                        {
                                                            value: 'maybe',
                                                            label: 'Maybe in another time.',
                                                        },
                                                        {
                                                            value: 'yes',
                                                            label: 'Yes, that sounds good.',
                                                        },
                                                        {
                                                            value: 'no',
                                                            label: 'No, it is not for me.',
                                                        },
                                                    ]}
                                                />,
                                            ]}
                                            button={<Button>Next</Button>}
                                            back={<Button variant="secondary">Back</Button>}
                                        />
                                    </MultiStepFormView>
                                </MultiStepFormController>
                            );
                        },
                    },
                },
                {
                    return({ softwareDeveloper, interested }) {
                        return {
                            softwareDeveloper,
                            interested,
                        };
                    },
                },
            ],
        },
    },
];
