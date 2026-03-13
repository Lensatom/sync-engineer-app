import { useState } from "react";

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  type Errors = { [K in keyof T]: string } & { general: string };

  const getInitialErrors = (): Errors => {
    const errors = { general: "" } as Errors;

    (Object.keys(initialValues) as (keyof T)[]).forEach((key) => {
      errors[key] = "" as Errors[keyof T];
    });

    return errors;
  };

  const [data, setData] = useState<T>({ ...initialValues });
  const [error, setError] = useState<Errors>(getInitialErrors());
  const [isLoading, setIsLoading] = useState(false);

  const clearFieldError = (key: keyof T) => {
    setError((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const changeData = (key: keyof T, value: any) => {
    clearFieldError(key);
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const changeError = (key: keyof Errors, value: string) => {
    setError((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearForm = () => {
    setData(initialValues);
  };

  const clearError = () => {
    setError(getInitialErrors());
  };

  return {
    data,
    setData,
    error,
    setError,
    changeError,
    changeData,
    clearForm,
    clearError,
    isLoading,
    setIsLoading,
  };
};
