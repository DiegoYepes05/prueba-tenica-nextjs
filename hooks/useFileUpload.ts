"use client";

import { useCallback, useRef, useState } from "react";

import { INITIAL_FILES } from "@/lib/constants";
import { FileEntry } from "@/types/FileEntry.interface";

export const useFileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileEntry[]>(INITIAL_FILES);

  const addFiles = useCallback((newFiles: File[]) => {
    const entries: FileEntry[] = newFiles.map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      mimeType: f.type || "application/octet-stream",
      tags: "",
      createdAt: new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      createdBy: "User Test 4",
    }));
    setFiles((prev) => [...prev, ...entries]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = Array.from(e.dataTransfer.files);
      if (dropped.length) addFiles(dropped);
    },
    [addFiles],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length) addFiles(selected);
    e.target.value = "";
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleTagChange = (id: string, tag: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, tags: tag } : f)),
    );
  };

  return {
    files,
    handleDelete,
    handleTagChange,
    isDragging,
    inputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleInputChange,
  };
};
