import { FileEntry } from "@/types/FileEntry.interface";

export const TAG_OPTIONS = ["Contrato", "Factura", "Reporte", "Manual", "Otro"];

export const INITIAL_FILES: FileEntry[] = [
  {
    id: "1",
    name: "Values.pdf",
    mimeType: "application/pdf",
    tags: "",
    createdAt: "08/12/2025",
    createdBy: "User Test 4",
  },
  {
    id: "2",
    name: "Template.pdf",
    mimeType: "application/pdf",
    tags: "",
    createdAt: "08/12/2025",
    createdBy: "User Test 4",
  },
];
