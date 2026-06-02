import { MAX_FILES } from "@/lib/validations";
import { UploadFile } from "@/types/UploadFile.interface";

interface Props {
  files: UploadFile[];
}

export const HelpPanel = ({ files }: Props) => {
  const total = files.length;
  const done = files.filter((f) => f.status === "done").length;
  const pending = files.filter(
    (f) => f.status === "queued" || f.status === "uploading",
  ).length;
  const errored = files.filter((f) => f.status === "error").length;

  return (
    <aside className="bg-white border border-gray-200 rounded-md p-4 flex flex-col gap-5 text-sm h-fit">
      <div>
        <h2 className="font-medium text-gray-700 mb-2">Detalles</h2>
        <dl
          aria-live="polite"
          className="grid grid-cols-2 gap-y-1 text-gray-600"
        >
          <dt>Total</dt>
          <dd className="text-right">
            {total}/{MAX_FILES}
          </dd>
          <dt>Completados</dt>
          <dd className="text-right text-green-600">{done}</dd>
          <dt>En proceso</dt>
          <dd className="text-right text-blue-600">{pending}</dd>
          <dt>Con error</dt>
          <dd className="text-right text-red-600">{errored}</dd>
        </dl>
      </div>

      <div>
        <h2 className="font-medium text-gray-700 mb-2">Ayuda</h2>
        <ul className="list-disc list-inside text-gray-500 space-y-1 text-xs">
          <li>Formatos permitidos: PDF, JPG, PNG, WEBP.</li>
          <li>Tamaño máximo de 5 MB por archivo.</li>
          <li>Entre 1 y {MAX_FILES} archivos.</li>
          <li>Puedes cancelar o reintentar cada archivo.</li>
        </ul>
      </div>
    </aside>
  );
};
