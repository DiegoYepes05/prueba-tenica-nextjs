import { Upload } from "lucide-react";

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
  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`
      border-2 border-dashed rounded-md cursor-pointer
      flex flex-col items-center justify-center py-8 sm:py-10 px-4 mb-0
      transition-colors duration-150
      ${isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white hover:bg-gray-50"}
    `}
    >
      <Upload
        size={32}
        className={`mb-3 ${isDragging ? "text-blue-400" : "text-gray-400"}`}
        strokeWidth={1.5}
      />
      <p className="text-sm text-gray-600 text-center">
        Arrastra y suelta tus archivos aquí o haz clic para seleccionarlos
      </p>
      <p className="text-xs text-gray-400 mt-1">Archivos permitidos: pdf</p>
      <p className="text-xs text-gray-400">Máximo de archivos permitido</p>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        multiple
        className="hidden"
        onChange={onInputChange}
      />
    </div>
  );
};
