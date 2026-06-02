export type UploadStatus =
  | "queued"
  | "uploading"
  | "done"
  | "error"
  | "canceled";

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: UploadStatus;
  progress: number;
  url?: string;
  error?: string;
  tags: string;
  createdAt: string;
  createdBy: string;
}

export interface UploadFormValues {
  title: string;
  description: string;
  files: UploadFile[];
}
