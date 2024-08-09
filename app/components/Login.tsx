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
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
    nisn: z.string().min(1, {
        message: "NISN tidak boleh kosong",
    }),
});

export function Login() {
    const [click, setClick] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nisn: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setClick(true);

        try {
            const response = await axios.post("/api/users", data);
            const userData = response.data.data[0];
            const user = localStorage.getItem("selesai");

            if (!userData) {
                throw new Error("User data is undefined");
            }

            if (user) {
                toast({
                    title: "Kamu sudah mengisi survey",
                    description: (
                        <p>Kamu tidak bisa lagi mengisi survey untuk kedua kalinya</p>
                    ),
                    variant: "destructive"
                });
            }

            toast({
                title: "Login berhasil",
                description: (
                    <>
                        Selamat datang, {userData.nama}!
                        <br />
                        Kamu akan diarahkan ke halaman berikutnya.
                    </>
                ),
            });

            setTimeout(() => {
                if (userData.kelas === 'admin') {
                    router.push('/admin');
                } else {
                    router.push('/survey/step-1');
                }
            }, 2000)
        } catch (error) {
            console.error(error);
            toast({
                title: "Login Gagal",
                description: "Ada error yang terjadi ketika kamu masuk, tolong ulangi lagi",
                variant: "destructive",
            });

            setClick(false)
        }
    }

    const handleNisnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, '');
        form.setValue("nisn", value);
    };

    return (
        <Form {...form}>
            <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="nisn"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Contoh: 00123456789"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleNisnChange(e);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    !click ?
                        <Button className="w-full" type="submit">Login</Button>
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
