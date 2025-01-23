import type { UseFormProps } from 'react-hook-form';

export type MultiStepFormViewProps = React.PropsWithChildren<Pick<UseFormProps, 'defaultValues' | 'resolver'>>;
