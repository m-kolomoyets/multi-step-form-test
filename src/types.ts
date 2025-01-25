export type ObjValues<T> = T[keyof T];

export type WithClassName<T> = T & {
    /**
        Extendable classnames of component
    */
    className?: string;
};

export type Slottable = {
    /**
     * If true, the component renders the original component inside the component.
     */
    asChild?: boolean;
};

export type SetStateValue<T> = React.Dispatch<React.SetStateAction<T>>;

export type SelectOption = {
    label: string;
    value: string;
};
