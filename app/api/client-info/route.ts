import { NextResponse } from "next/server";
import { getClientInfo } from "../../../lib/getClientInfo";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { viewportWidth, viewportHeight, page } = body;

    const clientInfo = await getClientInfo({ viewportWidth, viewportHeight });

    const query = `
      INSERT INTO client_info
        (ip, browser, os, device_type, device_category, viewport_width, viewport_height, country, state, city, page)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;

    const values = [
      clientInfo.ip,
      clientInfo.browser,
      clientInfo.os,
      clientInfo.deviceType,
      clientInfo.deviceCategory,
      clientInfo.viewportWidth,
      clientInfo.viewportHeight,
      clientInfo.country,
      clientInfo.state,
      clientInfo.city,
      page || null,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("Failed to save client info:", err);
    return NextResponse.json({ success: false, error: "Failed to save client info" }, { status: 500 });
  }
}