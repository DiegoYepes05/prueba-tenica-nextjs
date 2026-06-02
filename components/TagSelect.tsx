import { TAG_OPTIONS } from "@/lib/constants";

interface Props {
  value: string;
  onChange: (tag: string) => void;
  className?: string;
}

export const TagSelect = ({ value, onChange, className }: Props) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      <option value="">Seleccionar...</option>
      {TAG_OPTIONS.map((tag) => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
};
