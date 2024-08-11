import { UserService } from "@/app/services/userService";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dataUser = await UserService.getUserFromSpreadsheet();
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
    const dataUser = await UserService.loginUser(user.nisn);

    if (!dataUser) {
      return NextResponse.json({ message: "NISN salah" }, { status: 401 });
    }

    cookies().set({
      name: "user",
      value: JSON.stringify(dataUser[0]),
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json(
      { message: "Login berhasil", data: dataUser },
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
