import { UploadFile } from "@/types/UploadFile.interface";

import { FileTableRow } from "./FileTableRow";

interface Props {
  files: UploadFile[];
  onDelete: (id: string) => void;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
  onTagChange: (id: string, tag: string) => void;
}

const HEADERS = [
  "Opciones",
  "Nombre",
  "Tipo MIME",
  "Estado",
  "Etiquetas",
  "Creado el",
  "Creado por",
];

export const FileTable = ({
  files,
  onDelete,
  onCancel,
  onRetry,
  onTagChange,
}: Props) => {
  return (
    <div className="hidden md:block bg-white border border-gray-200 rounded-md overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-white">
            {HEADERS.map((header) => (
              <th
                key={header}
                className="text-left px-4 py-3 font-semibold text-gray-700 first:w-16"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {files.map((file, idx) => (
            <FileTableRow
              key={file.id}
              file={file}
              idx={idx}
              onDelete={onDelete}
              onCancel={onCancel}
              onRetry={onRetry}
              onTagChange={onTagChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
