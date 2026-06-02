import { Calendar, User } from "lucide-react";

import { FileEntry } from "@/types/FileEntry.interface";

import { DeleteButton } from "./DeleteButton";
import { MetaItem } from "./MetaItem";
import { TagSelect } from "./TagSelect";

interface Props {
  file: FileEntry;
  onDelete: (id: string) => void;
  onTagChange: (id: string, tag: string) => void;
}

export const FileListItem = ({ file, onDelete, onTagChange }: Props) => {
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <button className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-left break-all transition-colors">
          {file.name}
        </button>
        <DeleteButton onClick={() => onDelete(file.id)} className="shrink-0" />
      </div>

      <p className="text-xs text-gray-500 break-all">{file.mimeType}</p>

      <TagSelect
        value={file.tags}
        onChange={(tag) => onTagChange(file.id, tag)}
        className="border border-gray-300 rounded px-2 py-1.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 w-full"
      />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <MetaItem icon={<Calendar size={13} className="text-gray-400" />}>
          {file.createdAt}
        </MetaItem>
        <MetaItem icon={<User size={13} className="text-gray-400" />}>
          {file.createdBy}
        </MetaItem>
      </div>
    </div>
  );
};
