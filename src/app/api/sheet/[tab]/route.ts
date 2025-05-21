import { google } from "googleapis";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const pathnameParts = url.pathname.split("/");
    const tab = pathnameParts[pathnameParts.length - 1];
    
    const email = "yap-chatea@chatea-460215.iam.gserviceaccount.com";
    const privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDOyimU2t3Y0cHw\nj9YcTP6YYTuELLzb2iaivTOvV5fMI/k38avFtgqXTFggJKPOBTw3rV0sEcTyJRAK\nCmPc7oeUp0J9xA+3ruOB1tOckZEJEMAoSDWoN18OFXrZCZVRNYgzIqoQNoSfOd9n\nK9z6piJJ1xT0j07Bkpapt983or23roU69CUTrPyITeo32xiug91HCornqVgzBXVe\n31faYkOTL/FoGbz2NiADMHWhR+cilX6JD2aTWrfJGkFCCzL55jMF8DkioY23njJC\niU1TiouaUTux6WSQ92pWImHIikyVIBuD1qKoP8Oox8s3ZZGBwEtCiEfA4nhliVj3\nQCrP0DGzAgMBAAECggEAEfF2IjXLl4tmlK/RGFY7UTrpUH1r9c0Rb9WTAof14qoh\nxI+dJA65DzUkqxqtdqxQSVSAXS6S3vVbAEQJM5vO+pXOLd4xWZ2R8tY9ORINz7I7\nD5kUbtWUfe2x4dtJsD5A5I8BdV6wVftOPe7kbIC165+qGykZiwUOkF4laaJ0FoKk\nwwNIXlAuHxKBWJesz6s3MVmVeBu6ZgoCy63QvPlCvQGc1iA1sPB2l9OuU7BY6sgq\nRbciR2eiXeoC4TVfVJUl5DZIPs2skJ6gy3Yp/ZNwkzvTetupiVjTMTQ692Ge+E7O\nHcVrALaexda1WR0ENSXIsB0bk5J+cpw3RqiIl8tCIQKBgQD9IUOik56tpsEO2Ue6\nVxQVIGNdnh0jsj4VwsPvLyjGeIQ0iTKkyRMzmvIwUxzYIkFhUNRYDwVnBaU3Q7h6\np7QkcPkE5BR/jFQXxYeNsnH+XQnml8d4fXuCBw2sEfAOgtgn2yeyiruk3NdYJL25\nVzZQIrzvKsyActOkIwpE4UZ4RQKBgQDRImQRWB2YNA3jdAShLVvnwgTOfn6WQv8J\no+HymOMwHLIjKZW1/Hr/uMCazp43YFE+3kCUQULO+66gNQ2b14vM+Z39GAyxkdiJ\nE9UlUhnGgF3mLY8G69J/PI9FIHUaJoyRy3U4d7fiNlqq5xebziIeJwlN3xnmMQOm\n5OfXZDDNlwKBgQDHRc2iCkaL/E/VqbXu+yhjLVksVRIpjOOVa/ulq2GVRUEGvs9w\nrJ8CLEPnSTbW67i+rMxN+p1NKkOTiyuK28VUPt+7OvbsJoP5Jtb89PMKxSHLN8ef\nkmGNzpGz2Xc7ZURXtA6/Xro0ImshB+OYKhEm6wID4pSVtk/o0nD+Ir7AZQKBgD2I\no+7igVquPkPleBNAeGE5mhZz66Uks0vP14R87aPTXaqw6qbwUfR6FNm335+ljGI2\nHMRCa3jhXuEumwF2q2C1NYIpmFqK8i5rEnT3sjPQw1AdqY68xmO/mtwZD7uRCh0/\nww7JUuaRXZ4Zfr3OKgW7MKaj9UfgthVeFsUuapmjAoGBANigfiYJukghtg1TLhRI\n0xELSnung/tsMJcMRBsWnbt6DVtk9ZduvTr843WAZlMZu0dbH6pJD56n2kySpJVB\npAX9I5foX9ljoKlVEte8cokdpKwK+3PwvoSP2O7km9bONtE/91s/Zwgb+cfPGoN1\nHHka1RwRo2f70qRGTtS/fH/E\n-----END PRIVATE KEY-----\n";

    const auth = new JWT({
      email: email,
      key: privateKey,
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
