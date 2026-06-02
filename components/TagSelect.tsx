"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TAG_OPTIONS } from "@/lib/constants";

interface Props {
  value: string;
  onChange: (tag: string) => void;
  className?: string;
}

export const TagSelect = ({ value, onChange, className }: Props) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={className}
        aria-label="Etiqueta del archivo"
      >
        <SelectValue placeholder="Seleccionar..." />
      </SelectTrigger>
      <SelectContent>
        {TAG_OPTIONS.map((tag) => (
          <SelectItem key={tag} value={tag}>
            {tag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
