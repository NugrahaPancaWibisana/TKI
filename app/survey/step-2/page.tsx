'use client'
import { useEffect, useState } from 'react';

export default function Page() {
    const [aktifitasLulusan, setAktifitasLulusan] = useState<{ studi: string, kerja: string } | null>(null);

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

    function tampilkanPilihan(pilihan1: boolean, pilihan2: boolean): string {
        if (pilihan1 && pilihan2) {
            return "Anda memilih yang studi sambil kerja";
        } else if (pilihan1 && !pilihan2) {
            return "Anda memilih yang studi saja";
        } else if (!pilihan1 && pilihan2) {
            return "Anda memilih yang kerja saja";
        } else {
            return "Anda belum siap studi dan kerja";
        }
    }

    if (!aktifitasLulusan) {
        return <p>Loading...</p>;
    }

    return (
        <main className="w-full h-full flex flex-col justify-start items-center gap-2 py-5">
            <div className="w-[90%] md:w-[80%] border-2 border-blue-500 rounded-md text-center bg-blue-500 text-white flex justify-center items-center">
                <p className="w-full h-full p-1 md:p-5 flex justify-center items-center text-blue-500 bg-white border-r border-blue-500 rounded-s-md">STEP 1 - DATA LULUSAN</p>
                <p className="w-full h-full p-1 md:p-5 flex justify-center items-center text-blue-500 bg-white border-x border-blue-500">STEP 2 - DETAIL AKTIFITAS</p>
                <p className="w-full h-full p-1 md:p-5 flex justify-center items-center text-blue-500 bg-white border-l border-blue-500 rounded-e-md">STEP 3 - UMPAN BALIK</p>
            </div>

            {tampilkanPilihan(pilihan(aktifitasLulusan.studi), pilihan(aktifitasLulusan.kerja))}
        </main>
    );
}
