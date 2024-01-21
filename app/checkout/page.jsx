'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { formCheckoutSchema } from '@/utils/formCheckoutSchema';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserSession } from '@/utils/auth';
import Loading from '@/components/ui/loading';
import supabase from '@/config/supabaseClient';
import useCartStore from '@/store/cart-store';
import useAuthStore from '@/store/auth-store';
import { useToastUi } from '@/hooks/use-toast';
import 'react-toastify/dist/ReactToastify.css';
import AlertDialogComponent from '@/components/ui/alert-component';

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [items, totalAmount, clearCart] = useCartStore((state) => [state.items, state.totalAmount, state.clearCart]);
  const [isLogedIn] = useAuthStore((state) => [state.isLogedIn]);
  const formSchema = formCheckoutSchema();
  const toast = useToastUi();


  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const userSession = await getUserSession();

        if (userSession.session) {
          setUser(userSession.session.user);
        }

        if (!userSession.session) {
          router.push('/');
        }
      } catch (e) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [isLogedIn]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alamat: '',
    },
  });
  const { resetField, formState } = form;

  const onSubmit = async (values) => {
    const { error } = await supabase
      .from('purchase_order')
      .insert([
        {
          user_id: user.id,
          items: {
            ...items,
          },
          total_amount: totalAmount,
          alamat: values.alamat,
        },
      ])
      .select();

    if (!error) {
      toast('success', 'Pembelian berhasil!');
      resetField('nama');
      resetField('nohp');
      resetField('alamat');
      clearCart();
      router.refresh();
      router.push('/checkout/success');
    } else {
      toast('error', 'Pembelian gagal!');
    }
  };

  if (isLoading) {
    return (
      <main className="bg-gray-100  pt-24 h-screen">
        <Loading />
      </main>
    );
  }

  return (
    <main className={`bg-gray-100  pt-24 ${user ? 'h-max' : 'h-screen'}`}>
      {user && (
        <Card className="w-80 sm:w-[500px] mx-auto">
          <CardHeader className="text-center">
            <CardTitle>CHECKOUT</CardTitle>
            <p className="text-xs md:text-sm text-red-500">Harap isi data dan alamat dengan benar! untuk memudahkan proses pengiriman barang</p>
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
                        <Input placeholder="Masukkan nama anda!" {...field} value={user.user_metadata.nama} disabled={true} />
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
                        No Hp <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nohp anda!" {...field} value={user.user_metadata.nohp} disabled={true} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>
                        Alamat <span className="text-red-500">*</span> :
                      </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Masukkan alamat anda!" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mb-4" disabled={formState.isSubmitting}>
                  {formState.isSubmitting ? 'Loading...' : 'SELESAI'}
                </Button>
                <AlertDialogComponent title="Anda yakin ingin membatalkan pemesanan?" description="dengan membatalkan maka anda akan kembali ke halaman awal" onConfirm={() => router.push('/')}>
                  <Button type="button" variant="outline" className="w-full">
                    BATAL
                  </Button>
                </AlertDialogComponent>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
