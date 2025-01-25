import { createFileRoute } from '@tanstack/react-router';
import MultiStepForm from '@/modules/MultiStepForm';

export const Route = createFileRoute('/')({
    component: MultiStepForm,
});
