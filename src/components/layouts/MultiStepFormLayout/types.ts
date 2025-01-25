export type MultiStepFormLayoutProps = {
    /**
     * Title of the form
     */
    heading: React.ReactNode;
    /**
     * Description of the form
     */
    description: React.ReactNode;
    /**
     * Fields array of the form
     */
    fields: React.ReactNode;
    /**
     * Button of the form
     */
    button: React.ReactNode;
    /**
     * Back button of the form
     */
    back?: React.ReactNode;
} & React.ComponentProps<'div'>;
