import * as Yup from "yup";

export const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const MAX_SIZE = 5 * 1024 * 1024;
export const MIN_FILES = 1;
export const MAX_FILES = 10;

export const uploadSchema = Yup.object({
  title: Yup.string()
    .required("El título es requerido")
    .min(3, "Mínimo 3 caracteres"),

  description: Yup.string().required("La descripción es requerida"),

  files: Yup.array()
    .min(MIN_FILES, "Agrega al menos un archivo")
    .max(MAX_FILES, `Máximo ${MAX_FILES} archivos`)
    .required("Los archivos son requeridos"),
});
