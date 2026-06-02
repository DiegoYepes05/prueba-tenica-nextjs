"use client";

import { FileList } from "@/components/FileList";
import { FormField } from "@/components/FormField";
import { HelpPanel } from "@/components/HelpPanel";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ZoneDrop } from "@/components/ZoneDrop";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useUploadForm } from "@/hooks/useUploadForm";

export default function Page() {
  const {
    files,
    pendingCount,
    allDone,
    addErrors,
    removeFile,
    cancelFile,
    retryFile,
    handleTagChange,
    isDragging,
    inputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleInputChange,
  } = useFileUpload();

  const { formik, success, submitError, filesError } = useUploadForm(files);

  const submitDisabled = formik.isSubmitting || !formik.isValid || !allDone;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-5xl mx-auto flex flex-col gap-6"
      >
        <SectionHeader />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2 flex flex-col gap-4 min-w-0">
            <FormField
              id="title"
              label="Título"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title ? formik.errors.title : undefined}
            />

            <FormField
              id="description"
              label="Descripción"
              multiline
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description
                  ? formik.errors.description
                  : undefined
              }
            />

            <ZoneDrop
              isDragging={isDragging}
              inputRef={inputRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onInputChange={handleInputChange}
            />

            {addErrors.length > 0 && (
              <ul className="space-y-0.5">
                {addErrors.map((err) => (
                  <li key={err} className="text-xs text-red-500">
                    {err}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <HelpPanel files={files} />
        </div>

        <div className="flex flex-col gap-3 min-w-0">
          <FileList
            files={files}
            onDelete={removeFile}
            onCancel={cancelFile}
            onRetry={retryFile}
            onTagChange={handleTagChange}
          />

          {filesError && <p className="text-xs text-red-500">{filesError}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={submitDisabled}>
            {formik.isSubmitting ? "Enviando..." : "Enviar"}
          </Button>

          {pendingCount > 0 && (
            <span aria-live="polite" className="text-sm text-gray-500">
              {pendingCount} archivo{pendingCount > 1 ? "s" : ""} en proceso...
            </span>
          )}

          {success && (
            <span aria-live="polite" className="text-sm text-green-600">
              Enviado correctamente.
            </span>
          )}

          {submitError && (
            <span aria-live="assertive" className="text-sm text-red-500">
              {submitError}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
