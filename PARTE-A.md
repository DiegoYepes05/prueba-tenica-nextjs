# Parte A — Cuestionario

## 1. Modelado de tipos — `FileDescriptor`

```ts
type FileId = string & { readonly __brand: "FileId" };

interface FileBase {
  id: FileId;
  name: string;
  size: number;
  type: string;
}

interface IdleFile extends FileBase {
  status: "idle";
  readonly progress: 0;
}

interface UploadingFile extends FileBase {
  status: "uploading";
  progress: number;
}

interface DoneFile extends FileBase {
  status: "done";
  readonly progress: 100;
}

interface ErrorFile extends FileBase {
  status: "error";
  readonly progress: number;
  error: string;
}

interface CanceledFile extends FileBase {
  status: "canceled";
  readonly progress: number;
  error?: string;
}

type FileDescriptor =
  | IdleFile
  | UploadingFile
  | DoneFile
  | ErrorFile
  | CanceledFile;

function bumpProgress(file: FileDescriptor, value: number): FileDescriptor {
  if (file.status !== "uploading") return file;
  return { ...file, progress: Math.min(100, Math.max(0, value)) };
}
```

**Por qué lo hice así:** la clave del enunciado es que `progress` solo se pueda tocar cuando el archivo está subiendo, y eso lo resuelvo con una discriminated union sobre `status`. Pongo `progress` como `readonly` en todos los estados menos `uploading`, así si intento mutarlo sin antes comprobar el estado, TypeScript me frena en compilación en vez de descubrirlo en runtime. El `FileId` "branded" lo añadí porque me ha pasado mezclar ids con strings sueltos, y así el tipo no me deja.

## 2. Utilidad con genéricos — `mapFilesToDescriptors`

```ts
export function mapFilesToDescriptors(
  files: FileList | File[],
): FileDescriptor[] {
  const seen = new Set<string>();
  const descriptors: FileDescriptor[] = [];

  for (const file of Array.from(files)) {
    const key = `${file.name}-${file.size}`;
    if (seen.has(key)) continue;
    seen.add(key);

    descriptors.push({
      id: crypto.randomUUID() as FileId,
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
      status: "idle",
      progress: 0,
    });
  }

  return descriptors;
}
```

**Por qué lo hice así:** en vez de ramificar según si entra un `FileList` o un `File[]`, uso `Array.from`, que normaliza los dos a un array y deja el resto del código limpio. Para los duplicados me apoyo en `name+size`: el navegador te deja seleccionar el mismo archivo dos veces y la `File API` no da un id fiable, así que esta combinación es suficiente para el caso real sin tener que leer el contenido ni calcular un hash. El `crypto.randomUUID()` me da un id que no cambia, que es justo lo que necesito para las keys de React y para luego cancelar o reintentar ese archivo.

> Un apunte sobre lo de "genéricos": como la salida siempre es `FileDescriptor[]`, meter un genérico aquí no aportaría nada. Lo usaría si quisiera un mapper reutilizable tipo `mapFiles<T>(files, fn)`.

## 3. Control de concurrencia — `limitConcurrency`

```ts
export async function limitConcurrency<T>(
  pool: number,
  tasks: (() => Promise<T>)[],
): Promise<T[]> {
  const results = new Array<T>(tasks.length);
  let cursor = 0;

  async function worker(): Promise<void> {
    while (cursor < tasks.length) {
      const index = cursor++;
      results[index] = await tasks[index]();
    }
  }

  const workerCount = Math.max(1, Math.min(pool, tasks.length));
  await Promise.all(Array.from({ length: workerCount }, worker));

  return results;
}
```

**Por qué lo hice así:** en lugar de trocear las tareas en lotes (donde el lote entero espera al más lento), arranco `pool` "workers" que van tomando la siguiente tarea libre con `next++`. Así siempre hay como mucho `pool` corriendo a la vez y, en cuanto uno termina, agarra otra sin tiempos muertos. El orden del resultado lo garantizo guardando cada respuesta en `results[i]` por su índice original, no por el orden en que van acabando.

Sobre el **backpressure**: como cada tarea se ejecuta solo cuando un worker queda libre, nunca lanzo todas de golpe; si fueran subidas reales, eso me limita las conexiones y la memoria abiertas al mismo tiempo.

Sobre los **errores**: tal cual está es _fail-fast_ (si una promesa falla, revienta el `Promise.all`). En la práctica, para una pantalla de subida prefiero no perder los archivos que sí funcionaron, así que envolvería cada tarea para guardar su resultado o su error (como hace `Promise.allSettled`) y decidir el reintento archivo por archivo:

```ts
results[index] = await tasks[index]().then(
  (value) => ({ status: "fulfilled", value }),
  (reason) => ({ status: "rejected", reason }),
);
```
