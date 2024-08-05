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

const FormSchema = z.object({
    perkawinan: z.string({ required_error: "Please select a perkawinan to display." }),
    provinces: z.string({ required_error: "Please select a province to display." }),
    daerah: z.string({ required_error: "Please select a district to display." }),
    email: z.string({ required_error: "Please enter a valid email address." }).email(),
    telepon: z.string({ required_error: "Please enter a valid phone number (e.g. +62 812-3456-7890)." }),
    studi: z.enum(["ya", "tidak"])
})

export function Form1() {
    const [daerah, setDaerah] = useState<{ label: string; value: string; id: number }[]>([]);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const handleProvinceChange = (value: string) => {
        const selectedProvince = provinces.find(provinsi => provinsi.label === value);
        if (selectedProvince) {
            setDaerah(selectedProvince.daerah.map(item => ({ ...item })));
        }
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                        Perbarui status perkawinan mu
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
                                    }} defaultValue={field.value}>
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
                                        Provinsi tempat tinggal mu berada
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
                                        Kabupaten/Kota tempat tinggal mu berada
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
                                        <Input type="email" placeholder="Contoh: pengguna@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Masukan email pribadi mu
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
                                            placeholder="Contoh: 08123456789"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Masukan nomor telepon atau whatsapp mu
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </section>

                <section className="p-10 h-full w-[90%] md:w-[80%] border-2 border-gray-300 rounded-md flex flex-col justify-center items-start bg-white">
                    <p className="font-bold text-lg w-full text-left mb-3">AKTIFITAS SETELAH LULUS</p>
                    <FormField
                        control={form.control}
                        name="studi"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Apakah Anda sedang melanjutkan studi di perguruan tinggi?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="all" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                YA
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="mentions" />
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
                    <Separator className="my-4 bg-slate-300" />
                    <FormField
                        control={form.control}
                        name="studi"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Apakah Anda sedang bekerja atau berwirausaha?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="all" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                YA
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="mentions" />
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

                    <Button className="mt-3 place-self-end" type="submit">Simpan Dan Lanjut</Button>
                </section>
            </form>
        </Form >
    )
}
