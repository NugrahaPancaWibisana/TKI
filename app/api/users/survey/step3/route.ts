import { SurveyService } from "@/app/services/surveyService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await req.json();
        const dataUser = await SurveyService.ulasan(user.ulasan);  // Ensure you're passing the correct value

        return NextResponse.json(
            { message: "Pengisian survey berhasil", data: dataUser },
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