import { google } from "googleapis";
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(
  request: Request,
  { params }: { params: { tab: string } }
) {
  const { tab } = await params;
  try {
    const keyFilePath = path.join(
      process.cwd(),
      "config/google-service-account.json"
    );
    const keyFile = await fs.readFile(keyFilePath, "utf-8");

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(keyFile),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREEDSHEET_ID;
    const range = `${tab}!A:X`;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("Sheet API error:", error);
    return NextResponse.json(
      { error: "Unable to fetch sheet data" },
      { status: 500 }
    );
  }
  return NextResponse.json({ tab });
}
