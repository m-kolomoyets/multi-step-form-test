import { createLazyFileRoute } from '@tanstack/react-router';
import MultiStepForm from '@/modules/MultiStepForm';

export const Route = createLazyFileRoute('/')({
    component: MultiStepForm,
});
