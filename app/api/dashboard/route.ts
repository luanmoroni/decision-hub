import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { dashboardState } from "../../../db/schema";

const STATE_ID = "primary";

export async function GET() {
  try {
    const db = getDb();
    const [row] = await db.select().from(dashboardState).where(eq(dashboardState.id, STATE_ID)).limit(1);
    return Response.json({ data: row ? JSON.parse(row.data) : null, updatedAt: row?.updatedAt ?? null });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Falha ao carregar dados" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();
    if (!payload || typeof payload !== "object") return Response.json({ error: "Dados inválidos" }, { status: 400 });
    const db = getDb();
    const now = new Date();
    await db.insert(dashboardState).values({ id: STATE_ID, data: JSON.stringify(payload), updatedAt: now })
      .onConflictDoUpdate({ target: dashboardState.id, set: { data: JSON.stringify(payload), updatedAt: now } });
    return Response.json({ data: payload, updatedAt: now.toISOString() });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Falha ao salvar dados" }, { status: 500 });
  }
}
