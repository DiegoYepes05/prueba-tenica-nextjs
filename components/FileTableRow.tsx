import { Calendar, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/format";
import { cn } from "@/lib/utils";
import { UploadFile } from "@/types/UploadFile.interface";

import { ActionButtons } from "./ActionButtons";
import { StatusCell } from "./StatusCell";
import { TagSelect } from "./TagSelect";

interface Props {
  file: UploadFile;
  idx: number;
  onDelete: (id: string) => void;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
  onTagChange: (id: string, tag: string) => void;
}

export const FileTableRow = ({
  file,
  idx,
  onDelete,
  onCancel,
  onRetry,
  onTagChange,
}: Props) => {
  return (
    <tr
      className={cn(
        "border-b border-gray-100 last:border-0 hover:bg-blue-50/30 transition-colors",
        idx % 2 === 0 ? "bg-white" : "bg-gray-50/50",
      )}
    >
      <td className="px-4 py-3">
        <ActionButtons
          file={file}
          onDelete={onDelete}
          onCancel={onCancel}
          onRetry={onRetry}
        />
      </td>
      <td className="px-4 py-3">
        <Button
          type="button"
          variant="link"
          className="h-auto p-0 font-medium text-left text-blue-600"
        >
          {file.name}
        </Button>
        <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
      </td>
      <td className="px-4 py-3 text-gray-500">{file.type}</td>
      <td className="px-4 py-3">
        <StatusCell status={file.status} progress={file.progress} />
      </td>
      <td className="px-4 py-3">
        <TagSelect
          value={file.tags}
          onChange={(tag) => onTagChange(file.id, tag)}
          className="min-w-[150px]"
        />
      </td>
      <td className="px-4 py-3">
        <span className="flex items-center gap-1.5 text-gray-600">
          <Calendar size={13} className="text-gray-400" />
          {file.createdAt}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="flex items-center gap-1.5 text-gray-600">
          <User size={13} className="text-gray-400" />
          {file.createdBy}
        </span>
      </td>
    </tr>
  );
};
