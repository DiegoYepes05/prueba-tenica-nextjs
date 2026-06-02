## Prueba técnica

1. Clonar el repositorio
2. Instalar las dependencias

```
npm install
```

3. Corre el comando

```
npm run dev
```

## Decisiones técnicas

### Arquitectura de componentes
Dividí la interfaz en componentes pequeños y con una sola responsabilidad,
para que cada pieza sea fácil de entender, probar y mantener por separado.

### Custom hooks (separación de responsabilidades)
La lógica de negocio y los efectos secundarios viven en hooks propios
(`useFileUpload`), de modo que los componentes se ocupan solo de renderizar.
Sigue el principio de separar UI y lógica.

### Tipado seguro
Las interfaces y los tipos están aislados en `/types`, para tener una única
fuente de verdad sobre la forma de los datos en toda la aplicación.

### Estrategia de subida de archivos
Cada archivo gestiona su propio ciclo de vida (idle → uploading → done/error),
con seguimiento de progreso y `AbortController` para poder cancelar la subida.

### Control de concurrencia
Las subidas se limitan a un máximo de peticiones simultáneas para no saturar
la red, en la línea de la utilidad `limitConcurrency`.

### Validación del formulario
Formik gestiona el estado del formulario y el flujo de envío, mientras que los
esquemas de Yup en `/lib/validations.ts` aplican las reglas de campos y archivos.

## Parte A — Cuestionario

Las respuestas del cuestionario (con código y explicaciones) están en
[`PARTE-A.md`](./PARTE-A.md).
