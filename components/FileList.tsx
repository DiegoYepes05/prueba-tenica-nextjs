import { Lock } from "lucide-react";

import { UploadFile } from "@/types/UploadFile.interface";

import { FileCard } from "./FileCard";
import { FileTable } from "./FileTable";

interface Props {
  files: UploadFile[];
  onDelete: (id: string) => void;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
  onTagChange: (id: string, tag: string) => void;
}

export const FileList = ({
  files,
  onDelete,
  onCancel,
  onRetry,
  onTagChange,
}: Props) => {
  if (files.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-md py-10 flex flex-col items-center gap-2 text-gray-400">
        <Lock size={28} strokeWidth={1.5} />
        <p className="text-sm">No se han cargado archivos</p>
      </div>
    );
  }

  return (
    <>
      <div className="md:hidden bg-white border border-gray-200 rounded-md divide-y divide-gray-100">
        {files.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            onDelete={onDelete}
            onCancel={onCancel}
            onRetry={onRetry}
            onTagChange={onTagChange}
          />
        ))}
      </div>
      <FileTable
        files={files}
        onDelete={onDelete}
        onCancel={onCancel}
        onRetry={onRetry}
        onTagChange={onTagChange}
      />
    </>
  );
};
