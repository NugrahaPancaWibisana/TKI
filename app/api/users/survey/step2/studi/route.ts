import { DetailStudi } from "@/app/model/studi";
import { SurveyService } from "@/app/services/surveyService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const studiRequest: DetailStudi = await req.json();
        const userData = await JSON.parse(cookies().get("user")?.value!);
        const dataPribadi = await JSON.parse(cookies().get("dataPribadi")?.value!);

        const surveyData = {
            "Nomor Urut": userData.urut,
            "Nomor Induk": userData.induk,
            "NISN": userData.nisn,
            "NIK": userData.nik,
            "Nama": userData.nama,
            "Jenis Kelamin": userData.jenisKelamin,
            "Kelas": userData.kelas,
            "Status Perkawinan": dataPribadi["Status Perkawinan"],
            "Tempat tinggal sekarang - Provinsi": dataPribadi["Tempat tinggal sekarang - Provinsi"],
            "Tempat tinggal sekarang - Kabupaten/Kota": dataPribadi["Tempat tinggal sekarang - Kabupaten/Kota"],
            "Masukkan email pribadimu": dataPribadi["Masukkan email pribadimu"],
            "Masukkan nomor telepon atau whatsappmu": dataPribadi["Masukkan nomor telepon atau whatsappmu"],
            "Apakah akhir-akhir ini Anda sedang melanjutkan studi di perguruan tinggi?": dataPribadi["Apakah akhir-akhir ini Anda sedang melanjutkan studi di perguruan tinggi?"],
            "Apakah akhir-akhir ini Anda sedang bekerja atau berwirausaha?": dataPribadi["Apakah akhir-akhir ini Anda sedang bekerja atau berwirausaha?"],
            "Apakah anda bekerja atau berwirausaha?": dataPribadi["Apakah anda bekerja atau berwirausaha?"],
            "Dimana lokasi tempat Anda melanjutkan studi?": studiRequest.Studi,
            "Negara": studiRequest.negaraStudi,
            "Jenjang pendidikan": studiRequest.jenjangPendidikan,
            "Nama Perguruan Tinggi": studiRequest.perguruanTinggi,
            "Nama Program studi/Bidang keahlian": studiRequest.jurusan,
            "Apakah program studi/bidang keahlian yang Anda tempuh saat ini selaras dengan program/kompetensi keahlian di SMK?": studiRequest.pilihan,
            "Kapan Anda mulai studi di Perguruan Tinggi?": studiRequest.tanggal,
            "Apa alasan Anda melanjutkan pendidikan?": studiRequest.alasan
        };

        const answers = Object.values(surveyData);

        const data = [answers];

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
