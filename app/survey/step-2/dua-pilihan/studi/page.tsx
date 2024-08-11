import { Studi } from "@/app/components/Studi";

export default function page() {
    return (
        <main className="w-full h-full flex flex-col justify-start items-center gap-2 py-5 pb-[200px]">
            <div className="w-[90%] md:w-[80%] border-2 border-green-500 rounded-md text-center bg-green-500 text-white flex justify-center items-center">
                <p className="w-full h-[80px] p-1 text-sm flex justify-center items-center text-green-500 bg-white border-x border-green-500 rounded-s-md">STEP 1 - DATA LULUSAN</p>
                <p className="w-full h-[80px] p-1 text-sm flex justify-center items-center">STEP 2 - DETAIL AKTIFITAS</p>
                <p className="w-full h-[80px] p-1 text-sm flex justify-center items-center text-green-500 bg-white border-x border-green-500 rounded-e-md">STEP 3 - UMPAN BALIK</p>
            </div>

            <Studi />
        </main>
    )
}
