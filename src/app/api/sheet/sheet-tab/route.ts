import { google } from 'googleapis';
import path from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const keyFilePath = path.join(process.cwd(), 'config/google-service-account.json');
    const keyFile = await fs.readFile(keyFilePath, 'utf-8');

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(keyFile),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.SPREEDSHEET_ID,
    });

    const sheetTitles = response.data.sheets?.map(sheet => sheet.properties?.title);

    return NextResponse.json({ sheets: sheetTitles });
  } catch (error) {
    console.error('Error fetching sheet tabs:', error);
    return NextResponse.json({ error: 'Unable to fetch sheet tabs' });
  }
}