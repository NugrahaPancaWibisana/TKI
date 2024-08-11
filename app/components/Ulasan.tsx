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
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
    ulasan: z.string().optional(),
});

export function Ulasan() {
    const [click, setClick] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            ulasan: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setClick(true);

        try {
            await axios.post("/api/users/survey/step3", data);
            localStorage.setItem("selesai", "true")

            toast({
                title: "Terima Kasih Sudah Mengisi Survey Dari Kami",
            });

            setTimeout(() => {
                router.push("/");
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
            <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="ulasan"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Berikan kami saran maupun kritikan untuk survey ini</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ketikan kritik dan saran anda disini ( optional )"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    !click ?
                        <Button className="w-full" type="submit">Kirimkan</Button>
                        :
                        <Button disabled className="w-full">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Tunggu Sebentar
                        </Button>
                }
            </form>
        </Form>
    );
}
