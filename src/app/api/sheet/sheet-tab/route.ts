import { google } from "googleapis"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.SPREEDSHEET_ID,
    });

    const sheetTitles = response.data.sheets?.map(
      (sheet) => sheet.properties?.title
    );

    return NextResponse.json({ sheets: sheetTitles });
  } catch (error) {
    console.error("Error fetching sheet tabs:", error);
    return NextResponse.json({ error: "Unable to fetch sheet tabs" });
  }
}
