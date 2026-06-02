import { Calendar, User } from "lucide-react";

import { FileEntry } from "@/types/FileEntry.interface";

import { DeleteButton } from "./DeleteButton";
import { MetaItem } from "./MetaItem";
import { TagSelect } from "./TagSelect";

interface Props {
  file: FileEntry;
  idx: number;
  onDelete: (id: string) => void;
  onTagChange: (id: string, tag: string) => void;
}

export const FileTableRow = ({ file, idx, onDelete, onTagChange }: Props) => {
  return (
    <tr
      className={`border-b border-gray-100 last:border-0 ${
        idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
      } hover:bg-blue-50/30 transition-colors`}
    >
      <td className="px-4 py-3">
        <DeleteButton onClick={() => onDelete(file.id)} />
      </td>
      <td className="px-4 py-3">
        <button className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors">
          {file.name}
        </button>
      </td>
      <td className="px-4 py-3 text-gray-500">{file.mimeType}</td>
      <td className="px-4 py-3">
        <TagSelect
          value={file.tags}
          onChange={(tag) => onTagChange(file.id, tag)}
          className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 min-w-[130px]"
        />
      </td>
      <td className="px-4 py-3">
        <MetaItem icon={<Calendar size={13} className="text-gray-400" />}>
          {file.createdAt}
        </MetaItem>
      </td>
      <td className="px-4 py-3">
        <MetaItem icon={<User size={13} className="text-gray-400" />}>
          {file.createdBy}
        </MetaItem>
      </td>
    </tr>
  );
};
