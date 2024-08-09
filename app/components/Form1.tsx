"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { provinces } from '../data/dataDaerah';
import { useState } from "react"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
    perkawinan: z.string({ required_error: "Silakan pilih status perkawinan." })
        .min(3, { message: "Status perkawinan tidak boleh kosong." })
        .max(20, { message: "Status perkawinan tidak boleh lebih dari 20 karakter." }),
    provinces: z.string({ required_error: "Silakan pilih provinsi." })
        .min(3, { message: "Provinsi tidak boleh kosong." })
        .max(50, { message: "Provinsi tidak boleh lebih dari 50 karakter." }),
    daerah: z.string({ required_error: "Silakan pilih kabupaten/kota." })
        .min(3, { message: "Kabupaten/kota tidak boleh kosong" })
        .max(50, { message: "Kabupaten/kota tidak boleh lebih dari 50 karakter." }),
    email: z.string({ required_error: "Silakan masukkan alamat email yang valid." })
        .email({ message: "Alamat email tidak valid." }),
    telepon: z.string({ required_error: "Silakan masukkan nomor telepon yang valid (misal: 081234567890)." })
        .regex(/^08\d{8,11}$/, { message: "Nomor telepon harus diawali dengan 08 dan terdiri dari 10-13 digit." }),
    studi: z.enum(["ya", "tidak"], { errorMap: () => ({ message: "Silakan pilih status studi." }) }),
    kerja: z.enum(["ya", "tidak"], { errorMap: () => ({ message: "Silakan pilih status kerja." }) }),
    pekerjaan: z.enum(["bekerja", "berwirausaha"]).optional(),
}).refine((data) => {
    if (data.kerja === "ya") {
        return !!data.pekerjaan;
    }
    return true;
}, {
    message: "Silakan pilih pekerjaan jika Anda memilih 'ya' untuk status kerja.",
    path: ["pekerjaan"],
});


export function Form1() {
    const router = useRouter();
    const [daerah, setDaerah] = useState<{ label: string; value: string; id: number }[]>([]);
    const [pekerjaan, setPekerjaan] = useState<boolean>(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            perkawinan: "",
            provinces: "",
            daerah: "",
            email: "",
            telepon: "",
            studi: "tidak",
            kerja: "tidak"
        }
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await axios.post("/api/users/survey/step1", data);
            toast({
                title: "Data berhasil disimpan",
            })

            localStorage.setItem("pilihan", JSON.stringify({
                studi: data.studi,
                kerja: data.kerja,
                pekerjaan: pekerjaan ? data.pekerjaan : null
            }))

            setTimeout(() => {
                router.push('/survey/step-2');
            }, 2000)
        } catch (error) {
            console.error(error)
            toast({
                title: "Kesalahan",
                description: "Terjadi kesalahan. Silakan coba lagi nanti.",
                variant: "destructive"
            })
        }
    }

    const handleProvinceChange = (value: string) => {
        const selectedProvince = provinces.find(provinsi => provinsi.label === value);
        if (selectedProvince) {
            setDaerah(selectedProvince.daerah.map(item => ({ ...item })));
        }
    };

    const handleTeleponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, '');
        form.setValue("telepon", value);
    };

    const handleRadioChange = (value: string) => {
        setPekerjaan(value === 'ya');
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col items-center justify-center gap-2">
                <section className="p-10 h-full w-[90%] md:w-[80%] border-2 border-gray-300 rounded-md flex flex-col justify-center items-center bg-white">
                    <p className="font-bold text-lg w-full text-left mb-3">UPDATE DATA PRIBADIMU</p>
                    <div className="w-full h-full flex flex-col items-center xl:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="perkawinan"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Status perkawinan</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Belum Menikah">Belum Menikah</SelectItem>
                                            <SelectItem value="Sudah Menikah">Sudah Menikah</SelectItem>
                                            <SelectItem value="Sudah Cerai">Sudah Cerai</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Perbarui status perkawinanmu
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="provinces"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Tempat tinggal sekarang - Provinsi</FormLabel>
                                    <Select onValueChange={(value) => {
                                        field.onChange(value);
                                        handleProvinceChange(value);
                                    }} defaultValue={field.value} required>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {provinces.map((provinsi) => (
                                                <SelectItem key={provinsi.value} value={provinsi.label}>{provinsi.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Provinsi tempat tinggalmu
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="daerah"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Tempat tinggal sekarang - Kabupaten/Kota</FormLabel>
                                    {
                                        daerah.length === 0 ?
                                            <Select disabled>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih" />
                                                    </SelectTrigger>
                                                </FormControl>
                                            </Select>
                                            :
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {daerah.sort().map((item) => (
                                                        <SelectItem key={item.id} value={item.value}>{item.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                    }
                                    <FormDescription>
                                        Kabupaten/Kota tempat tinggalmu
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full h-full flex flex-col items-center xl:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Contoh: pengguna@gmail.com" {...field} required />
                                    </FormControl>
                                    <FormDescription>
                                        Masukkan email pribadimu
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="telepon"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Nomor telepon/whatsapp</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Contoh: 081234567890"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleTeleponChange(e);
                                            }}
                                            required
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Masukkan nomor telepon atau whatsappmu
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </section>

                <section className="p-10 h-full w-[90%] md:w-[80%] border-2 border-gray-300 rounded-md flex flex-col justify-center items-start bg-white">
                    <p className="font-bold text-lg w-full text-left mb-3">AKTIVITAS SETELAH LULUS</p>
                    <FormField
                        control={form.control}
                        name="studi"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Apakah akhir-akhir ini Anda sedang melanjutkan studi di perguruan tinggi?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        required
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="ya" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                YA
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="tidak" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                TIDAK
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
                        name="kerja"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Apakah akhir-akhir ini Anda sedang bekerja atau berwirausaha?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        required
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            handleRadioChange(value);
                                        }}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="ya" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                YA
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="tidak" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                TIDAK
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator className={`my-4 ${pekerjaan ? '' : 'hidden'}`} />
                    <FormField
                        control={form.control}
                        name="pekerjaan"
                        render={({ field }) => (
                            <FormItem className={`space-y-3 ${pekerjaan ? '' : 'hidden'}`}>
                                <FormLabel>Apakah anda bekerja atau berwirausaha?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        required
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="bekerja" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Bekerja
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="berwirausaha" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Berwirausaha
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="place-self-end" type="submit">Simpan Dan Lanjut</Button>
                </section>
            </form>
        </Form>
    )
}
