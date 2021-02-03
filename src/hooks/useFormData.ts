import isEqual from "lodash.isequal";
import { useState } from "react";

export interface UseFormDataProps<T> {
    initialData: T;
}

export interface UseFormDataResult<F> {
    formData: F;
    onChange: <T extends keyof F>(section: T) =>
        (field: keyof F[typeof section]) =>
            (value: F[typeof section][typeof field]) => void;
    hasChanged: boolean;
}

const useFormData = <F>({ initialData }: UseFormDataProps<F>): UseFormDataResult<F> => {
    const [formData, setFormData] = useState<F>(initialData);

    const onChangeForm = <T extends keyof F>(section: T) =>
        (field: keyof F[typeof section]) =>
            (value: F[typeof section][typeof field]): void =>
                setFormData((oldForm) => {
                    const newSection = { ...oldForm[section], [field]: value };
                    return { ...oldForm, [section]: newSection };
                });

    return {
        formData,
        onChange: onChangeForm,
        hasChanged: !isEqual(initialData, formData),
    };
};

export default useFormData;
