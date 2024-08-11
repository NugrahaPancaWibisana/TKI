import { google } from "googleapis";

export class SurveyService {
    static async sendSurveyDataStudi(data: string[]) {
        try {
            const auth = await google.auth.getClient({
                keyFile: process.env.GOOGLE_APP_CREDENTIALS_FILE!,
                scopes: ["https://www.googleapis.com/auth/spreadsheets"],
            });

            const sheets = google.sheets({ version: "v4", auth });

            const result = await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.STUDI_SHEET_ID!,
                range: "STUDI",
                valueInputOption: "INSERT_ROWS",
                requestBody: {
                    values: [data],
                },
            });

           return result.data
        } catch (e) {
            console.error('Error appending data:', e);
            throw new Error('Failed to send survey data');
        }
    }
}
