import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title || !body.description) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  if (!Array.isArray(body.files) || body.files.length === 0) {
    return NextResponse.json(
      { error: "Se requiere al menos un archivo" },
      { status: 400 },
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json({ ok: true });
}
