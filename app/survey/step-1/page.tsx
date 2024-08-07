import { Form1 } from "../../components/Form1";

export default function page() {
    return (
        <main className="w-full h-full flex flex-col justify-start items-center gap-2 py-5">
            <div className="w-[90%] md:w-[80%] border-2 border-slate-900 rounded-md text-center bg-slate-900 text-white flex justify-center items-center">
                <p className="w-full h-full p-1 md:p-5 flex justify-center items-center rounded-s-md">STEP 1 - DATA LULUSAN</p>
                <p className="w-full h-full p-1 md:p-5 flex justify-center items-center text-slate-900 bg-white border-x border-slate-900">STEP 2 - DETAIL AKTIFITAS</p>
                <p className="w-full h-full p-1 md:p-5 flex justify-center items-center text-slate-900 bg-white border-x border-slate-900 rounded-e-md">STEP 3 - UMPAN BALIK</p>
            </div>

            <Form1 />
        </main>
    )
}
