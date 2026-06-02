import { useEffect, useState } from "react";

import { useFormik } from "formik";

import { submitUpload } from "@/lib/api";
import { uploadSchema } from "@/lib/validations";
import { UploadFile, UploadFormValues } from "@/types/UploadFile.interface";

export const useUploadForm = (files: UploadFile[]) => {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formik = useFormik<UploadFormValues>({
    initialValues: { title: "", description: "", files: [] },
    validationSchema: uploadSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      setSuccess(false);
      setSubmitError(null);

      const allDone =
        files.length > 0 && files.every((f) => f.status === "done");
      if (!allDone) {
        setSubmitError("Espera a que todos los archivos terminen de subir");
        return;
      }

      try {
        await submitUpload({ ...values, files });
        setSuccess(true);
      } catch {
        setSubmitError("No se pudo enviar el formulario");
      }
    },
  });

  const { setFieldValue } = formik;
  useEffect(() => {
    setFieldValue("files", files);
  }, [files, setFieldValue]);

  const filesError =
    typeof formik.errors.files === "string" ? formik.errors.files : undefined;

  return { formik, success, submitError, filesError };
};
