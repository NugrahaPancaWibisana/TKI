'use client'
import { Studi } from '@/app/components/Studi';
import { useEffect, useState } from 'react';

interface Tampilan {
    border: string;
    bg: string;
    text: string;
}

export default function Page() {
    const [aktifitasLulusan, setAktifitasLulusan] = useState<{ studi: string, kerja: string, pekerjaan: string } | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem("pilihan");
            if (data) {
                setAktifitasLulusan(JSON.parse(data));
            }
        }
    }, []);

    function pilihan(value: string): boolean {
        return value === "ya";
    }

    function tampilkanPilihan(pilihan1: boolean, pilihan2: boolean, pilihan3?: string | null | undefined) {
        if (pilihan1 && pilihan2 && pilihan3 === "bekerja") {
            return "Anda memilih yang studi sambil bekerja";
        } else if (pilihan1 && pilihan2 && pilihan3 === "berwirausaha") {
            return "Anda memilih yang studi sambil berwirausaha";
        } else if (pilihan1 && !pilihan2) {
            return <Studi />;
        } else if (!pilihan1 && pilihan2 && pilihan3 === "bekerja") {
            return "Anda memilih yang bekerja saja";
        } else if (!pilihan1 && pilihan2 && pilihan3 === "berwirausaha") {
            return "Anda memilih yang berwirausaha saja";
        } else {
            return "Anda belum siap studi dan kerja";
        }
    }

    function tampilan(): Tampilan {
        if (aktifitasLulusan?.studi) {
            return {
                border: "border-green-500",
                bg: "bg-green-500",
                text: "text-green-500"
            }
        } else if (aktifitasLulusan?.kerja) {
            return {
                border: "border-blue-500",
                bg: "bg-blue-500",
                text: "text-blue-500"
            }
        } else {
            return {
                border: "border-red-500",
                bg: "bg-red-500",
                text: "text-red-500"
            }
        }
    }

    if (!aktifitasLulusan) {
        return <p>Loading...</p>;
    }

    return (
        <main className="w-full h-full flex flex-col justify-start items-center gap-2 py-5">
            <div className={`w-[90%] md:w-[80%] border-2 rounded-md text-cente flex justify-center items-center ${tampilan().border} ${tampilan().bg}`}>
                <p className={`w-full h-full p-1 md:p-5 flex justify-center items-center bg-white border-r rounded-s-md ${tampilan().text} ${tampilan().border}`}>STEP 1 - DATA LULUSAN</p>
                <p className={`w-full h-full p-1 md:p-5 flex justify-center items-center text-white border-x ${tampilan().bg} ${tampilan().border}`}>STEP 2 - DETAIL AKTIFITAS</p>
                <p className={`w-full h-full p-1 md:p-5 flex justify-center items-center bg-white border-l rounded-e-md ${tampilan().text} ${tampilan().border}`}>STEP 3 - UMPAN BALIK</p>
            </div>

            {tampilkanPilihan(pilihan(aktifitasLulusan.studi), pilihan(aktifitasLulusan.kerja), aktifitasLulusan.pekerjaan)}
        </main>
    );
}
