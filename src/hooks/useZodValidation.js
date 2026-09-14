import { useCallback, useState } from "react";
import { getZodFieldErrors } from "../schemas/formSchemas";

export const useZodValidation = (schema) => {
  const [errors, setErrors] = useState({});

  const clearError = useCallback((field) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }, []);

  const resetErrors = useCallback(() => setErrors({}), []);

  const validate = useCallback(
    (values, options = {}) => {
      const result = schema.safeParse(values);
      if (result.success) {
        setErrors({});
        return result.data;
      }

      const nextErrors = getZodFieldErrors(result.error);
      setErrors(nextErrors);

      if (options.focus !== false && typeof document !== "undefined") {
        const firstField = Object.keys(nextErrors)[0];
        requestAnimationFrame(() => {
          document.querySelector(`[name="${firstField}"], #${firstField}`)?.focus();
        });
      }

      return null;
    },
    [schema],
  );

  return { errors, validate, clearError, resetErrors, setErrors };
};

export default useZodValidation;

