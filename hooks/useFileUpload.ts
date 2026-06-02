"use client";

import { useCallback, useRef, useState } from "react";

import { uploadFileRequest } from "@/lib/api";
import { ACCEPTED_TYPES, MAX_FILES, MAX_SIZE } from "@/lib/validations";
import { UploadFile } from "@/types/UploadFile.interface";

const makeKey = (name: string, size: number) => `${name}-${size}`;

const formattedToday = () =>
  new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export const useFileUpload = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [addErrors, setAddErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const rawFiles = useRef(new Map<string, File>());
  const controllers = useRef(new Map<string, AbortController>());
  const intervals = useRef(new Map<string, ReturnType<typeof setInterval>>());

  const patch = useCallback((id: string, changes: Partial<UploadFile>) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...changes } : f)),
    );
  }, []);

  const cleanup = useCallback((id: string) => {
    const interval = intervals.current.get(id);
    if (interval) {
      clearInterval(interval);
      intervals.current.delete(id);
    }
    controllers.current.delete(id);
  }, []);

  const startUpload = useCallback(
    (id: string, file: File) => {
      const controller = new AbortController();
      controllers.current.set(id, controller);

      patch(id, { status: "uploading", progress: 0, error: undefined });

      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id && f.status === "uploading"
              ? { ...f, progress: Math.min(f.progress + 10, 90) }
              : f,
          ),
        );
      }, 200);
      intervals.current.set(id, interval);

      uploadFileRequest(file, controller.signal)
        .then(async (res) => {
          cleanup(id);
          if (!res.ok) {
            patch(id, { status: "error", error: "Error al subir el archivo" });
            return;
          }
          const data = await res.json();
          patch(id, { status: "done", progress: 100, url: data.url });
        })
        .catch((err) => {
          cleanup(id);
          if (err.name === "AbortError") return;
          patch(id, { status: "error", error: "Error de red" });
        });
    },
    [patch, cleanup],
  );

  const addFiles = useCallback(
    (incoming: File[]) => {
      const errors: string[] = [];
      const keys = new Set(files.map((f) => makeKey(f.name, f.size)));
      const accepted: UploadFile[] = [];

      for (const file of incoming) {
        const key = makeKey(file.name, file.size);

        if (keys.has(key)) {
          errors.push(`${file.name}: archivo duplicado`);
        } else if (!ACCEPTED_TYPES.includes(file.type)) {
          errors.push(`${file.name}: tipo no permitido`);
        } else if (file.size > MAX_SIZE) {
          errors.push(`${file.name}: supera el tamaño máximo (5 MB)`);
        } else if (files.length + accepted.length >= MAX_FILES) {
          errors.push(`${file.name}: máximo ${MAX_FILES} archivos`);
        } else {
          const id = crypto.randomUUID();
          keys.add(key);
          rawFiles.current.set(id, file);
          accepted.push({
            id,
            name: file.name,
            size: file.size,
            type: file.type || "application/octet-stream",
            status: "queued",
            progress: 0,
            tags: "",
            createdAt: formattedToday(),
            createdBy: "User Test 4",
          });
        }
      }

      setAddErrors(errors);
      if (accepted.length) {
        setFiles((prev) => [...prev, ...accepted]);
        accepted.forEach((entry) =>
          startUpload(entry.id, rawFiles.current.get(entry.id)!),
        );
      }
    },
    [files, startUpload],
  );

  const cancelFile = useCallback(
    (id: string) => {
      controllers.current.get(id)?.abort();
      cleanup(id);
      patch(id, { status: "canceled" });
    },
    [cleanup, patch],
  );

  const retryFile = useCallback(
    (id: string) => {
      const file = rawFiles.current.get(id);
      if (file) startUpload(id, file);
    },
    [startUpload],
  );

  const handleTagChange = useCallback(
    (id: string, tag: string) => {
      patch(id, { tags: tag });
    },
    [patch],
  );

  const removeFile = useCallback(
    (id: string) => {
      controllers.current.get(id)?.abort();
      cleanup(id);
      rawFiles.current.delete(id);
      setFiles((prev) => prev.filter((f) => f.id !== id));
    },
    [cleanup],
  );

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

  const pendingCount = files.filter(
    (f) => f.status === "queued" || f.status === "uploading",
  ).length;
  const allDone = files.length > 0 && files.every((f) => f.status === "done");

  return {
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
  };
};
