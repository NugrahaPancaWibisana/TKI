"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Link from "next/link";

const FormSchema = z.object({
    kegiatan: z.string().min(1, {
        "message":
            "Silakan isi nama kegiatan yang Anda lakukan."
    }),
});

export function TidakSiap() {
    const [click, setClick] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            kegiatan: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setClick(true);

        try {
            await axios.post("/api/users/survey/step2/tidak", data);

            toast({
                title: "Data berhasil dikirimkan",
            })

            setTimeout(() => {
                router.push('/survey/step-3');
            }, 2000)
        } catch (error) {
            console.error(error);
            toast({
                title: "Terjadi kesalahan saat mengirim data",
            });

            setClick(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col items-center justify-center gap-2">
                <section className="p-10 h-full w-[90%] md:w-[80%] border-2 border-red-500 rounded-md flex flex-col justify-center items-center bg-white">
                    <p className="font-bold text-lg w-full text-left mb-3">FORM LULUSAN YANG BELUM MEMILIKI AKTIFITAS</p>
                    <FormField
                        control={form.control}
                        name="kegiatan"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Kegiatan apa yang anda lakukan akhir-akhir ini?</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Ketikan kegiatan anda akhir akhir ini"
                                        className="resize-none"
                                        {...field}
                                    />
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
                                <Button type="submit" className="bg-red-500">Kirim dan lanjutkan</Button>
                                :
                                <Button disabled className="bg-red-500">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Tunggu Sebentar
                                </Button>
                        }
                    </div>
                </section>
            </form>
        </Form>
    );
}
