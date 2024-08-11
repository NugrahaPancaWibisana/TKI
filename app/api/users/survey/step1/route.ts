import { DataPribadi } from "@/app/model/dataPribadi";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
    try {
        const dataUser = cookies().get("survey1")?.value;
        const admin = cookies().get("user")?.value.includes("admin");

        if (!admin) {
            return NextResponse.json(
                { message: "Hanya admin yang dapat mengakses data siswa" },
                { status: 403 }
            );
        }
        return NextResponse.json({ data: dataUser }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Terjadi kesalahan pada server" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const user: DataPribadi = await req.json() as DataPribadi;

        cookies().set({
            name: "dataPribadi",
            value: JSON.stringify({
                "Status Perkawinan": user.perkawinan,
                "Tempat tinggal sekarang - Provinsi": user.provinces,
                "Tempat tinggal sekarang - Kabupaten/Kota": user.daerah,
                "Masukkan email pribadimu": user.email,
                "Masukkan nomor telepon atau whatsappmu": user.telepon,
                "Apakah akhir-akhir ini Anda sedang melanjutkan studi di perguruan tinggi?": user.studi,
                "Apakah akhir-akhir ini Anda sedang bekerja atau berwirausaha?": user.kerja,
                "Apakah anda bekerja atau berwirausaha?": user.pekerjaan,
            }),
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "strict",
            path: "/",
        });

        return NextResponse.json(
            { message: "Data pribadi berhasil diperbarui", data: user },
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
