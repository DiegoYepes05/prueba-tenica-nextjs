import { UploadFormValues } from "@/types/UploadFile.interface";

export const uploadFileRequest = (file: File, signal: AbortSignal) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetch("/api/upload", {
    method: "POST",
    body: formData,
    signal,
  });
};

export const submitUpload = async (payload: UploadFormValues) => {
  const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: payload.title,
      description: payload.description,
      files: payload.files.map((f) => ({
        id: f.id,
        name: f.name,
        size: f.size,
        type: f.type,
        url: f.url,
      })),
    }),
  });

  if (!res.ok) throw new Error("Error al enviar el formulario");
  return res.json();
};
