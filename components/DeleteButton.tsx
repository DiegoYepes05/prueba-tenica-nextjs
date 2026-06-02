import { Trash2 } from "lucide-react";

interface Props {
  onClick: () => void;
  className?: string;
}

export const DeleteButton = ({ onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      title="Eliminar"
      className={`p-1.5 rounded bg-red-500 hover:bg-red-600 text-white transition-colors ${className ?? ""}`}
    >
      <Trash2 size={13} />
    </button>
  );
};
