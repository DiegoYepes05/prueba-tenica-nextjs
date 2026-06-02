import { Calendar, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/format";
import { UploadFile } from "@/types/UploadFile.interface";

import { ActionButtons } from "./ActionButtons";
import { StatusCell } from "./StatusCell";
import { TagSelect } from "./TagSelect";

interface Props {
  file: UploadFile;
  onDelete: (id: string) => void;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
  onTagChange: (id: string, tag: string) => void;
}

export const FileCard = ({
  file,
  onDelete,
  onCancel,
  onRetry,
  onTagChange,
}: Props) => {
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 font-medium text-left whitespace-normal break-all text-blue-600"
          >
            {file.name}
          </Button>
          <p className="text-xs text-gray-400">
            {formatBytes(file.size)} · {file.type}
          </p>
        </div>
        <div className="shrink-0">
          <ActionButtons
            file={file}
            onDelete={onDelete}
            onCancel={onCancel}
            onRetry={onRetry}
          />
        </div>
      </div>

      <StatusCell status={file.status} progress={file.progress} />

      <TagSelect
        value={file.tags}
        onChange={(tag) => onTagChange(file.id, tag)}
        className="w-full"
      />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} className="text-gray-400" />
          {file.createdAt}
        </span>
        <span className="flex items-center gap-1.5">
          <User size={13} className="text-gray-400" />
          {file.createdBy}
        </span>
      </div>
    </div>
  );
};
