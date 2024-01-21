'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useToastUi } from '@/hooks/use-toast';
import { formRegisterSchema } from '@/utils/formRegisterSchema';
import { register, getUserSession } from '@/utils/auth';
import useAuthStore from '@/store/auth-store';

export default function Register() {
  const [setIsLogedIn] = useAuthStore((state) => [state.setIsLogedIn]);
  const router = useRouter();
  const formSchema = formRegisterSchema();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: '',
      email: '',
      nohp: '',
      password: '',
    },
  });
  const { resetField, formState } = form;
  const toast = useToastUi();
  useEffect(() => {
    const getUser = async () => {
      const user = await getUserSession();
      if (user.session) {
        router.push('/');
      }
    };

    getUser();
  }, []);

  async function onSubmit(values) {
    const { error } = await register(values);

    if (!error) {
      toast('success', 'Pendaftaran berhasil!');
      resetField('nama');
      resetField('email');
      resetField('nohp');
      resetField('password');
      router.refresh();
      setIsLogedIn(true);
      router.push('/');
    } else {
      toast('error', 'Email sudah terdaftar!');
    }
  }

  return (
    <main className=" bg-gray-100 h-max py-24 " suppressHydrationWarning={true}>
      <Card className="w-80 sm:w-[500px] mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Daftar</CardTitle>
        </CardHeader>
        <CardContent className="px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>
                      Nama <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama anda!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>
                      Email <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan email anda!" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nohp"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>
                      No Hp <span className="text-red-500">*</span>:
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan no hp anda!" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>
                      Password <span className="text-red-500">*</span> :
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Masukkan password anda!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mb-4" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? 'Mendaftar ...' : 'Daftar'}
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href="/login">Masuk</Link>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
