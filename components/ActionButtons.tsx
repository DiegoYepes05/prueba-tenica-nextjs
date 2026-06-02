import { RotateCw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UploadFile } from "@/types/UploadFile.interface";

import { DeleteButton } from "./DeleteButton";

interface Props {
  file: UploadFile;
  onDelete: (id: string) => void;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
}

export const ActionButtons = ({
  file,
  onDelete,
  onCancel,
  onRetry,
}: Props) => {
  return (
    <div className="flex items-center gap-1.5">
      <DeleteButton
        onClick={() => onDelete(file.id)}
        ariaLabel={`Eliminar ${file.name}`}
      />

      {file.status === "uploading" && (
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          onClick={() => onCancel(file.id)}
          title="Cancelar"
          aria-label={`Cancelar subida de ${file.name}`}
        >
          <X />
        </Button>
      )}

      {(file.status === "error" || file.status === "canceled") && (
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => onRetry(file.id)}
          title="Reintentar"
          aria-label={`Reintentar subida de ${file.name}`}
        >
          <RotateCw />
        </Button>
      )}
    </div>
  );
};
