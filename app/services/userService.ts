import { ref, child, get } from "firebase/database";
import { google } from "googleapis";
import { database } from "../libs/database";

interface StudentData {
  urut: string;
  induk: string;
  nisn: string;
  nik: string;
  nama: string;
  jenisKelamin: "L" | "P";
  kelas: string;
}

export class UserService {
  static async getUserFromFirebase() {
    try {
      const snapshot = await get(child(ref(database), "users/"));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getUserFromSpreadsheet(): Promise<StudentData[]> {
    try {
      const auth = await google.auth.getClient({
        keyFile: process.env.GOOGLE_APP_CREDENTIALS_FILE!,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      });

      const sheets = google.sheets({ version: "v4", auth });
      const result = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: process.env.SHEET_ID!,
        ranges: ["Sheet1"],
      });

      const res = result.data.valueRanges;
      const sheetsData = res?.flatMap((response) => response.values ?? []);

      const filteredData = sheetsData!.filter((row: any[]) => {
        if (!Array.isArray(row)) return false;
        if (row.length !== 7) return false;
        if (typeof row[0] !== "string" || isNaN(Number(row[0]))) return false;
        if (!row.slice(1, 6).every((item) => typeof item === "string"))
          return false;
        if (row[5] !== "L" && row[5] !== "P") return false;
        return true;
      });

      const typedFilteredData: StudentData[] = filteredData.map(
        ([urut, induk, nisn, nik, nama, jenisKelamin, kelas]) => ({
          urut,
          induk,
          nisn,
          nik,
          nama,
          jenisKelamin: jenisKelamin as "L" | "P",
          kelas,
        })
      );

      return typedFilteredData;
    } catch (err) {
      console.error("Failed to get users:", err);
      return [];
    }
  }

  static async loginUser(nisn: string) {
    try {
      const user = await this.getUserFromSpreadsheet();
      const data = user.filter((user: { nisn: string }) => user.nisn === nisn);
      if (data) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
