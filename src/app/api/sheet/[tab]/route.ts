import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathnameParts = url.pathname.split("/");
    const tab = pathnameParts[pathnameParts.length - 1]; 

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
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
}
