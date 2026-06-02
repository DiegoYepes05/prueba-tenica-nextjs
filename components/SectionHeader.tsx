import { Upload } from "lucide-react";
export const SectionHeader = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Upload size={16} className="text-gray-500" />
      <span className="text-sm font-medium text-gray-600 tracking-wide uppercase">
        Carga de archivos
      </span>
    </div>
  );
};
