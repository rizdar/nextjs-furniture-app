'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import 'react-toastify/dist/ReactToastify.css';
import { useToastUi } from '@/hooks/use-toast';
import { formLoginSchema } from '@/utils/formLoginSchema';
import { getUserSession, login } from '@/utils/auth';
import useAuthStore from '@/store/auth-store';

export default function Login() {
  const router = useRouter();
  const formSchema = formLoginSchema();
  const toast = useToastUi();
  const [setIsLogedIn] = useAuthStore((state) => [state.setIsLogedIn]);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserSession();
      if (user.session) {
        router.push('/');
      }
    };

    getUser();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { resetField, formState } = form;

  async function onSubmit(values) {
    const { error } = await login(values.email, values.password);
    if (!error) {
      toast('success', 'Berhasil masuk!');
      resetField('email');
      resetField('password');
      router.refresh();
      setIsLogedIn(true);
      router.push('/');
    } else {
      toast('error', 'Email / Password salah!');

      router.refresh();
    }
  }

  return (
    <main className="bg-gray-100 h-screen pt-24" suppressHydrationWarning={true}>
      <Card className="w-80 sm:w-[500px] mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Masuk</CardTitle>
        </CardHeader>
        <CardContent className="px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                {formState.isSubmitting ? 'Loading...' : 'Masuk'}
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href="/register">Daftar</Link>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
