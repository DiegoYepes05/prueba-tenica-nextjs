import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
}

export const DeleteButton = ({ onClick, ariaLabel, className }: Props) => {
  return (
    <Button
      type="button"
      variant="destructive"
      size="icon-sm"
      onClick={onClick}
      title="Eliminar"
      aria-label={ariaLabel ?? "Eliminar archivo"}
      className={className}
    >
      <Trash2 />
    </Button>
  );
};
