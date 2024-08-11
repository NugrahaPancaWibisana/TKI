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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { negara } from "../data/dataNegara"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import Link from "next/link"

const formSchema = z.object({
  Studi: z.enum(["Dalam Negeri", "Luar Negeri"], {
    errorMap: () => ({ message: "Silakan pilih lokasi studi." }),
  }),
  negaraStudi: z.string().min(1, { message: "Negara studi tidak boleh kosong." }).optional(),
  jenjangPendidikan: z.string().min(1, { message: "Jenjang pendidikan tidak boleh kosong." }),
  perguruanTinggi: z.string().min(1, { message: "Perguruan tinggi tidak boleh kosong." }),
  jurusan: z.string().min(1, { message: "Jurusan tidak boleh kosong." }),
  pilihan: z.string().min(1, { message: "Pilihan tidak boleh kosong." }),
  tanggal: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Tanggal harus dalam format YYYY-MM-DD." }),
  alasan: z.string().min(10, {
    message: "Alasan anda melanjutkan pendidikan harus lebih dari 10 karakter",
  }),
})
  .refine((data) => data.Studi === "Dalam Negeri" || data.negaraStudi, {
    message: "Negara studi harus diisi jika memilih Luar Negeri.",
    path: ["negaraStudi"],
  });

export function Studi() {
  const [luarNegeri, setLuarNegeri] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col items-center justify-center gap-2">
        <section className="p-10 h-full w-[90%] md:w-[80%] border-2 border-green-500 rounded-md flex flex-col justify-center items-center bg-white">
          <p className="font-bold text-lg w-full text-left mb-3">FORM LULUSAN YANG MELANJUTKAN STUDI</p>
          <FormField
            control={form.control}
            name="Studi"
            render={({ field }) => (
              <FormItem className="w-full space-y-3">
                <FormLabel>Dimana lokasi tempat Anda melanjutkan studi?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value)
                      setLuarNegeri(value === "Luar Negeri")
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Dalam Negeri" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Dalam Negeri
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Luar Negeri" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Luar Negeri
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className={`my-4 ${luarNegeri ? '' : 'hidden'}`} />
          <FormField
            control={form.control}
            name="negaraStudi"
            render={({ field }) => (
              <FormItem className={`w-full ${luarNegeri ? '' : 'hidden'}`}>
                <FormLabel>Negara</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Negara" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {negara.map((a) => {
                      return <SelectItem value={a.negara} key={a.no}>{a.negara}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Di negara mana anda melanjutkan studi?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-4" />
          <FormField
            control={form.control}
            name="jenjangPendidikan"
            render={({ field }) => (
              <FormItem className="w-full space-y-3">
                <FormLabel>Jenjang pendidikan?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="D-1" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        D-1
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="D-2" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        D-2
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="D-3" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        D-3
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="D-4/Sarjana Terapan" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        D-4/Sarjana Terapan
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="S-1" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        S-1
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-4" />
          <div className="w-full h-full flex flex-col items-center xl:flex-row gap-5">
            <FormField
              control={form.control}
              name="perguruanTinggi"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nama Perguruan Tinggi?</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Perguruan Tinggi" {...field} />
                  </FormControl>
                  <FormDescription>
                    Masukkan nama perguruan tinggi
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jurusan"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nama Program studi/Bidang keahlian?</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Program studi/Bidang keahlian"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukkan nama program studi mu
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="my-4" />
          <FormField
            control={form.control}
            name="pilihan"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Apakah program studi/bidang keahlian yang Anda tempuh saat ini selaras dengan program/kompetensi keahlian di SMK?
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sangat tidak selaras (program studi non-vokasi, misal: ilmu bahasa, matematika, sosiologi)">
                      Sangat tidak selaras <br className="block md:hidden" /> (program studi non-vokasi, misal: <br className="block md:hidden" /> ilmu bahasa, matematika, sosiologi)
                    </SelectItem>
                    <SelectItem value="Tidak Selaras (program studi vokasi dengan bidang keahlian yang berbeda)">
                      Tidak Selaras <br className="block md:hidden" /> (program studi vokasi dengan <br className="block md:hidden" /> bidang keahlian yang berbeda)
                    </SelectItem>
                    <SelectItem value="Selaras (berbeda program keahlian tetapi masih dalam ruang lingkup bidang keahlian yang sama)">
                      Selaras <br className="block md:hidden" /> (berbeda program keahlian <br className="block md.hidden" /> tetapi masih dalam ruang lingkup <br className="block md.hidden" /> bidang keahlian yang sama)
                    </SelectItem>
                    <SelectItem value="Sangat selaras (program keahlian yang sama)">
                      Sangat selaras <br className="block md:hidden" /> (program keahlian yang sama)
                    </SelectItem>

                  </SelectContent>
                </Select>
                <FormDescription>
                  Pilih status keselarasan program studi dengan kompetensi keahlian SMK.
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
                <FormLabel>Kapan Anda mulai studi di Perguruan Tinggi?</FormLabel>
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
            name="alasan"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Apa alasan Anda melanjutkan pendidikan?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ketikan alasan anda disini"
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
            <Button type="submit" className="bg-green-500">Simpan dan lanjutkan</Button>
          </div>
        </section>
      </form>
    </Form>
  )
}
