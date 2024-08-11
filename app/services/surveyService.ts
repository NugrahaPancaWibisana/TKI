import { google } from "googleapis";

export class SurveyService {
    static async sendSurveyDataStudi(data: string[][]) { // Mengharapkan string[][]
        try {
            const auth = await google.auth.getClient({
                keyFile: process.env.GOOGLE_APP_CREDENTIALS_FILE!,
                scopes: ["https://www.googleapis.com/auth/spreadsheets"],
            });

            const sheets = google.sheets({ version: "v4", auth });

            const result = await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.SHEET_ID!,
                range: "STUDI",
                valueInputOption: "RAW",
                requestBody: {
                    values: data,
                },
            });

            return result.data;
        } catch (e) {
            console.error('Error appending data:', e);
            throw new Error('Failed to send survey data');
        }
    }

    static async sendSurveyDataWirausaha(data: string[][]) { // Mengharapkan string[][]
        try {
            const auth = await google.auth.getClient({
                keyFile: process.env.GOOGLE_APP_CREDENTIALS_FILE!,
                scopes: ["https://www.googleapis.com/auth/spreadsheets"],
            });

            const sheets = google.sheets({ version: "v4", auth });

            const result = await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.SHEET_ID!,
                range: "WIRAUSAHA",
                valueInputOption: "RAW",
                requestBody: {
                    values: data,
                },
            });

            return result.data;
        } catch (e) {
            console.error('Error appending data:', e);
            throw new Error('Failed to send survey data');
        }
    }

    static async sendSurveyDataBekerja(data: string[][]) { // Mengharapkan string[][]
        try {
            const auth = await google.auth.getClient({
                keyFile: process.env.GOOGLE_APP_CREDENTIALS_FILE!,
                scopes: ["https://www.googleapis.com/auth/spreadsheets"],
            });

            const sheets = google.sheets({ version: "v4", auth });

            const result = await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.SHEET_ID!,
                range: "PEKERJA",
                valueInputOption: "RAW",
                requestBody: {
                    values: data,
                },
            });

            return result.data;
        } catch (e) {
            console.error('Error appending data:', e);
            throw new Error('Failed to send survey data');
        }
    }

    static async ulasan(data: string) {
        try {
            const auth = await google.auth.getClient({
                keyFile: process.env.GOOGLE_APP_CREDENTIALS_FILE!,
                scopes: ["https://www.googleapis.com/auth/spreadsheets"],
            });

            const sheets = google.sheets({ version: "v4", auth });

            const result = await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.SHEET_ID!,
                range: "ULASAN",
                valueInputOption: "RAW",
                requestBody: {
                    values: [[data]],
                },
            });

            return result.data;
        } catch (e) {
            console.error('Error appending data:', e);
            throw new Error('Failed to send ulasan');
        }
    }

    static async tidakSiap(data: string[][]) {
        try {
            const auth = await google.auth.getClient({
                keyFile: process.env.GOOGLE_APP_CREDENTIALS_FILE!,
                scopes: ["https://www.googleapis.com/auth/spreadsheets"],
            });

            const sheets = google.sheets({ version: "v4", auth });

            const result = await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.SHEET_ID!,
                range: "TIDAK_MELANJUTKAN",
                valueInputOption: "RAW",
                requestBody: {
                    values: data,
                },
            });

            return result.data;
        } catch (e) {
            console.error('Error appending data:', e);
            throw new Error('Failed to send ulasan');
        }
    }
}
