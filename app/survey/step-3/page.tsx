import { Ulasan } from "@/app/components/Ulasan";

export default async function Home() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center bg-slate-50">
      <section className="px-10 py-10 w-[90%] md:w-[500px] border-2 border-gray-300 rounded-md flex flex-col justify-center items-center bg-white">
        <Ulasan />
      </section>
      <p className="text-sm w-full text-center absolute bottom-10">&copy; PKL NESASTECH 2024</p>
    </main>
  );
}
