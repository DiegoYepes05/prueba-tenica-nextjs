import { FileEntry } from "@/types/FileEntry.interface";

import { FileListItem } from "./FileListItem";
import { FileTable } from "./FileTable";

interface Props {
  files: FileEntry[];
  onDelete: (id: string) => void;
  onTagChange: (id: string, tag: string) => void;
}

export const FileList = ({ files, onDelete, onTagChange }: Props) => {
  if (files.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-b-md py-8 text-center text-gray-400 text-sm">
        Aún no se han cargado archivos.
      </div>
    );
  }

  return (
    <>
      <div className="md:hidden bg-white border border-gray-200 rounded-b-md divide-y divide-gray-100">
        {files.map((file) => (
          <FileListItem
            key={file.id}
            file={file}
            onDelete={onDelete}
            onTagChange={onTagChange}
          />
        ))}
      </div>
      <FileTable files={files} onDelete={onDelete} onTagChange={onTagChange} />
    </>
  );
};
