import { memo, useCallback } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useMultiStepFormController } from '../../context/MultiStepFormControllerContext';
import Button from '@/ui/Button';

const BackButton: React.FC = () => {
    const { getValues } = useFormContext();
    const { onBack } = useMultiStepFormController();

    const backClickHandler = useCallback(() => {
        onBack(getValues());
    }, [getValues, onBack]);

    return (
        <Button type="button" variant="secondary" onClick={backClickHandler}>
            <ArrowLeftIcon />
            Back
        </Button>
    );
};

export default memo(BackButton);
