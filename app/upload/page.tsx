"use client";

import { FileList } from "@/components/FileList";
import { SectionHeader } from "@/components/SectionHeader";
import { ZoneDrop } from "@/components/ZoneDrop";
import { useFileUpload } from "@/hooks/useFileUpload";

export default function Page() {
  const {
    files,
    handleDelete,
    handleTagChange,
    isDragging,
    inputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleInputChange,
  } = useFileUpload();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeader />

        <ZoneDrop
          isDragging={isDragging}
          inputRef={inputRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onInputChange={handleInputChange}
        />

        <FileList
          files={files}
          onDelete={handleDelete}
          onTagChange={handleTagChange}
        />
      </div>
    </div>
  );
}
