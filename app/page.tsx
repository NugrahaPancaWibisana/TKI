import { Login } from "./components/Login";

export default async function Home() {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center bg-slate-50">
      <section className="px-10 py-10 w-[90%] md:w-[400px] border-2 border-gray-300 rounded-md flex flex-col justify-center items-center bg-white">
        <div className="mb-12 text-center flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-sm">Masukkan NISN anda di bawah ini</p>
        </div>
        <Login />
      </section>
      <p className="text-sm w-full text-center absolute bottom-10">&copy; PKL NESASTECH 2024</p>
    </main>
  );
}
