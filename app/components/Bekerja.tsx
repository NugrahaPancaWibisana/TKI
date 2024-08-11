"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import Link from "next/link"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    alamat: z.string()
        .min(10, "Alamat harus terdiri dari minimal 10 karakter")
        .max(255, "Alamat tidak boleh lebih dari 255 karakter"),
    pekerjaan: z.string()
        .min(2, "Pekerjaan harus terdiri dari minimal 2 karakter")
        .max(100, "Pekerjaan tidak boleh lebih dari 100 karakter"),
    tempatBekerja: z.string()
        .min(2, "Nama tempat bekerja harus terdiri dari minimal 2 karakter")
        .max(100, "Nama tempat bekerja tidak boleh lebih dari 100 karakter"),
    atasan: z.string()
        .min(2, "Nama atasan harus terdiri dari minimal 2 karakter")
        .max(100, "Nama atasan tidak boleh lebih dari 100 karakter"),
    jabatan: z.string()
        .min(2, "Jabatan harus terdiri dari minimal 2 karakter")
        .max(100, "Jabatan tidak boleh lebih dari 100 karakter"),
    tanggal: z.string(),
    email: z.string()
        .email("Email tidak valid")
        .optional()
        .or(z.literal("").optional()),
    jenis: z.string(),
});

export function Bekerja() {
    const router = useRouter();
    const [click, setClick] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setClick(true)
        try {
            await axios.post('/api/users/survey/step2/bekerja', values)
            toast({
                title: "Data berhasil dikirimkan",
            })
            localStorage.setItem("selesai", "true")

            setTimeout(() => {
                router.push('/survey/step-3');
            }, 2000)
        } catch (error) {
            console.error('Terjadi kesalahan saat mengirim data:', error)
            toast({
                title: "Terjadi kesalahan saat mengirim data",
            })

            setTimeout(() => {
                setClick(false)
            }, 2000)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col items-center justify-center gap-2">
                <section className="p-10 h-full w-[90%] md:w-[80%] border-2 border-blue-500 rounded-md flex flex-col justify-center items-center bg-white">
                    <p className="font-bold text-lg w-full text-left mb-3">FORM LULUSAN YANG MELANJUTKAN BEKERJA</p>
                    <FormField
                        control={form.control}
                        name="alamat"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Dimana lokasi tempat Anda bekerja?</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tuliskan alamat dimana anda berwirausaha"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4" />
                    <FormField
                        control={form.control}
                        name="pekerjaan"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Apa nama pekerjaan/jabatan/posisi Anda di tempat kerja saat ini?</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Contoh : Manager, Operator, Mekanik, Resepsionis, Pramusaji, Kurir, dll
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4" />
                    <FormField
                        control={form.control}
                        name="tempatBekerja"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Apa nama tempat Anda bekerja?</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Contoh : PT. ABCDEF atau CV. GHIJKL
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4" />
                    <FormField
                        control={form.control}
                        name="atasan"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Nama atasan langsung di tempat bekerja</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Keterangan : Mohon mengisi dengan nama lengkap untuk keperluan penilaian lulusan SMK oleh atasan, Identitas atasan Anda akan dijaga kerahasiaannya
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4" />
                    <FormField
                        control={form.control}
                        name="jabatan"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Jabatan/Posisi atasan langsung</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Contoh : Supervisor, Manager, Kepala Bagian dll
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4" />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Email/nomor kontak atasan langsung (tidak wajib)</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Contoh : 081234567890 atau pengguna@gmail.com" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Keterangan : Mohon mengisi dengan email/nomor kontak yang aktif untuk keperluan penilaian lulusan SMK oleh atasan, Email dan nomor kontak atasan Anda akan dijaga kerahasiaannya
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4" />
                    <FormField
                        control={form.control}
                        name="tanggal"
                        render={({ field }) => (
                            <FormItem className="place-self-start">
                                <FormLabel>Kapan Anda mendapatkan pekerjaan yang pertama kali setelah lulus SMK?</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4" />
                    <FormField
                        control={form.control}
                        name="jenis"
                        render={({ field }) => (
                            <FormItem className="w-full space-y-3">
                                <FormLabel>Apa jenis instansi/lembaga/perusahaan/tempat Anda bekerja?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Instansi pemerintah" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Instansi pemerintah
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Lembaga internasional" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Lembaga internasional
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Lembaga Non-profit (contoh: yayasan/LSM)" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Lembaga Non-profit (contoh: yayasan/LSM)
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Lembaga profit (contoh: perusahan swasta/BUMN/BUMD)" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Lembaga profit (contoh: perusahan swasta/BUMN/BUMD)
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Koperasi" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Koperasi
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Usaha perorangan (contoh: toko sembako, warung makan, usaha fotokopi dll)" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Usaha perorangan (contoh: toko sembako, warung makan, usaha fotokopi dll)
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Rumah tangga (contoh: asisten rumah tangga, sopir pribadi)" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Rumah tangga (contoh: asisten rumah tangga, sopir pribadi)
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between gap-4 place-self-end mt-5">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button type="reset" variant="outline">Kembali</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Tindakan ini tidak dapat menghapus semua progress anda, dan kembali ke survey awal.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction><Link href={"/survey/step-1"}>Ya, Kembali</Link></AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        {
                            !click ?
                                <Button type="submit" className="bg-blue-500">Kirim dan lanjutkan</Button>
                                :
                                <Button disabled className="bg-blue-500">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Tunggu Sebentar
                                </Button>
                        }
                    </div>
                </section>
            </form>
        </Form>
    )
}
