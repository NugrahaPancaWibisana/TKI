import { DetailStudi } from "@/app/model/studi";
import { SurveyService } from "@/app/services/surveyService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const user: DetailStudi = await req.json();

        const dataPribadi = await JSON.parse(cookies().get("user")?.value!);
        const survey = {
            "Dimana lokasi tempat Anda melanjutkan studi?": user.Studi,
            "Negara?": user.negaraStudi,
            "Jenjang pendidikan?": user.jenjangPendidikan,
            "Nama Perguruan Tinggi?": user.perguruanTinggi,
            "Nama Program studi/Bidang keahlian?": user.jurusan,
            "Apakah program studi/bidang keahlian yang Anda tempuh saat ini selaras dengan program/kompetensi keahlian di SMK?": user.pilihan,
            "Kapan Anda mulai studi di Perguruan Tinggi?": user.tanggal,
            "Apa alasan Anda melanjutkan pendidikan?": user.alasan,
        }

        const data = { ...dataPribadi[0], ...survey }

        const result = await SurveyService.sendSurveyDataStudi(data);

        return NextResponse.json(
            { message: "Survey 2 berhasil", data: result },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Terjadi kesalahan pada server" },
            { status: 500 }
        );
    }
}
