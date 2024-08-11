import { SurveyService } from "@/app/services/surveyService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const bekerjaRequest = await req.json();
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
            "Dimana lokasi tempat Anda bekerja?": bekerjaRequest.alamat,
            "Apa nama pekerjaan/jabatan/posisi Anda di tempat kerja saat ini?": bekerjaRequest.pekerjaan,
            "Apa nama tempat Anda bekerja?": bekerjaRequest.tempatBekerja,
            "Nama atasan langsung di tempat bekerja": bekerjaRequest.atasan,
            "Jabatan/Posisi atasan langsung": bekerjaRequest.jabatan,
            "Kapan Anda mendapatkan pekerjaan yang pertama kali setelah lulus SMK?": bekerjaRequest.tanggal,
            "Email/nomor kontak atasan langsung (tidak wajib)": bekerjaRequest.email,
            "Apa jenis instansi/lembaga/perusahaan/tempat Anda bekerja?": bekerjaRequest.jenis,
        };

        const answers = Object.values(surveyData);

        const data = [answers];

        const result = await SurveyService.sendSurveyDataBekerja(data);

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
