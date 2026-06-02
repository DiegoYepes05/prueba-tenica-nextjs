import { Upload } from "lucide-react";

import { ACCEPTED_TYPES, MAX_FILES } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface Props {
  isDragging: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ZoneDrop = ({
  isDragging,
  inputRef,
  onDrop,
  onDragOver,
  onDragLeave,
  onInputChange,
}: Props) => {
  const openPicker = () => inputRef.current?.click();

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Arrastra y suelta archivos aquí o pulsa para seleccionarlos"
      onClick={openPicker}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPicker();
        }
      }}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={cn(
        "border-2 border-dashed rounded-md cursor-pointer flex flex-col items-center justify-center py-8 sm:py-10 px-4 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        isDragging
          ? "border-blue-400 bg-blue-50"
          : "border-gray-300 bg-white hover:bg-gray-50",
      )}
    >
      <Upload
        size={32}
        className={`mb-3 ${isDragging ? "text-blue-400" : "text-gray-400"}`}
        strokeWidth={1.5}
      />
      <p className="text-sm text-gray-600 text-center">
        Arrastra y suelta tus archivos aquí o haz clic para seleccionarlos
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Permitidos: PDF, JPG, PNG, WEBP · máx. 5 MB c/u
      </p>
      <p className="text-xs text-gray-400">Hasta {MAX_FILES} archivos</p>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        multiple
        className="hidden"
        onChange={onInputChange}
      />
    </div>
  );
};
