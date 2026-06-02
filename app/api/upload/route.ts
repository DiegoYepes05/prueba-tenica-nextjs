import { NextResponse } from "next/server";
const FAILURE_RATE = 0.2;
const NETWORK_DELAY_MS = 1500;
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "No se proporcionó ningún archivo" },
      { status: 400 },
    );
  }
  if (Math.random() < FAILURE_RATE) {
    return NextResponse.json(
      { error: "Error al subir el archivo" },
      { status: 500 },
    );
  }
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));
  return NextResponse.json({
    id: crypto.randomUUID(),
    url: `https://storage.mock.com/${file.name}`,
  });
}
