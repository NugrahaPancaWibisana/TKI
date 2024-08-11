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
    bentukWirausaha: z.string()
        .min(2, "Bentuk wirausaha harus terdiri dari minimal 2 karakter")
        .max(100, "Bentuk wirausaha tidak boleh lebih dari 100 karakter"),
    bidangWirausaha: z.string()
        .min(2, "Bidang wirausaha harus terdiri dari minimal 2 karakter")
        .max(100, "Bidang wirausaha tidak boleh lebih dari 100 karakter"),
    produkWirausaha: z.string()
        .min(3, "Produk wirausaha harus dipilih"),
    kepemilikan: z.string()
        .min(3, "Kepemilikan harus dipilih"),
    tanggal: z.string(),
    omsetBulanan: z.string()
        .min(3, "Omset bulanan harus dipilih"),
    bergantiUsaha: z.string()
        .min(3, "Berganti usaha harus dipilih"),
});


export function Berwirausaha() {
    const router = useRouter();
    const [click, setClick] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setClick(true)
        try {
            await axios.post('/api/users/survey/step2/wirausaha', values)
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
                    <p className="font-bold text-lg w-full text-left mb-3">FORM LULUSAN YANG MELANJUTKAN BERWIRAUSAHA</p>
                    <FormField
                        control={form.control}
                        name="alamat"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Dimana lokasi tempat usaha/wirausaha Anda?</FormLabel>
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
                        name="bentukWirausaha"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Apa bentuk wirausaha Anda?</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Bentuk wirausaha anda" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Contoh: Usaha perseorangan, Koperasi, Firma, CV, PT, dll
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4" />
                    <FormField
                        control={form.control}
                        name="bidangWirausaha"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Apa bidang wirausaha Anda?</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Bidang wirausaha anda" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Contoh : Pertanian, Teknologi, Perdagangan, dll
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4" />
                    <FormField
                        control={form.control}
                        name="produkWirausaha"
                        render={({ field }) => (
                            <FormItem className="w-full space-y-3">
                                <FormLabel>Apa produk usaha Anda?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Barang" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Barang
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Jasa" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Jasa
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Barang dan Jasa" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Barang dan Jasa
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4" />
                    <FormField
                        control={form.control}
                        name="kepemilikan"
                        render={({ field }) => (
                            <FormItem className="w-full space-y-3">
                                <FormLabel>Status kepemilikan usaha yang dijalankan</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Milik Sendiri" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Milik Sendiri
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Milik Bersama" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Milik Bersama
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
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
                                <FormLabel>Kapan Anda mulai berwirausaha pertama kali setelah lulus SMK?</FormLabel>
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
                        name="omsetBulanan"
                        render={({ field }) => (
                            <FormItem className="w-full space-y-3">
                                <FormLabel>Berapa rata-rata omset bulanan (hasil usaha kotor yang diperoleh dalam satu bulan) wirausaha Anda? (dalam rupiah)</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Kurang dari Rp. 25.000.000," />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Kurang dari Rp. 25.000.000,
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Rp. 25.000.000 s.d Rp. 50.000.000," />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Rp. 25.000.000 s.d Rp. 50.000.000,
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Rp. 51.000.000 s.d Rp. 100.000.000,-" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Rp. 51.000.000 s.d Rp. 100.000.000,
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Lebih dari Rp. 100.000.000" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Lebih dari Rp. 100.000.000
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className="my-4" />
                    <FormField
                        control={form.control}
                        name="bergantiUsaha"
                        render={({ field }) => (
                            <FormItem className="w-full space-y-3">
                                <FormLabel>Berapa kali Anda berganti usaha sejak Anda lulus dari SMK?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Belum pernah" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Belum pernah
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Satu Kali" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Satu Kali
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Dua Kali Atau Lebih" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Dua Kali Atau Lebih
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
