import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { UploadStatus } from "@/types/UploadFile.interface";

const STATUS_LABEL: Record<UploadStatus, string> = {
  queued: "En cola",
  uploading: "Subiendo",
  done: "Completado",
  error: "Error",
  canceled: "Cancelado",
};

const BADGE_CLASS: Record<UploadStatus, string> = {
  queued: "bg-gray-100 text-gray-600",
  uploading: "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
  canceled: "bg-gray-100 text-gray-400",
};

const BAR_CLASS: Record<UploadStatus, string> = {
  queued: "[&>[data-slot=progress-indicator]]:bg-gray-300",
  uploading: "[&>[data-slot=progress-indicator]]:bg-blue-500",
  done: "[&>[data-slot=progress-indicator]]:bg-green-500",
  error: "[&>[data-slot=progress-indicator]]:bg-red-500",
  canceled: "[&>[data-slot=progress-indicator]]:bg-gray-300",
};

interface Props {
  status: UploadStatus;
  progress: number;
}

export const StatusCell = ({ status, progress }: Props) => {
  const showBar = status === "uploading" || status === "done";

  return (
    <div className="flex flex-col gap-1.5 min-w-[120px]">
      <Badge aria-live="polite" className={cn("w-fit", BADGE_CLASS[status])}>
        {STATUS_LABEL[status]}
        {status === "uploading" && ` ${progress}%`}
      </Badge>
      {showBar && (
        <Progress
          value={progress}
          aria-label={`Progreso de subida: ${progress}%`}
          className={cn("h-1.5", BAR_CLASS[status])}
        />
      )}
    </div>
  );
};
