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

export async function POST(req: NextRequest) {
    try {
        const user = await req.json();

        cookies().set({
            name: "survey1",
            value: JSON.stringify(user),
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "strict",
            path: "/",
        });

        return NextResponse.json(
            { message: "Survey 1 berhasil", data: user },
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
