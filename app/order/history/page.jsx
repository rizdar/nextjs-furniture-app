'use client';

import OrderDetail from '@/components/order/OrderDetail';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import supabase from '@/config/supabaseClient';
import { getUserSession } from '@/utils/auth';
import Loading from '@/components/ui/loading';
import { useEffect, useState } from 'react';
import useAuthStore from '@/store/auth-store';
import { useRouter } from 'next/navigation';

export default function TableDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [productItems, setProductItems] = useState(null);
  const [isLogedIn] = useAuthStore((state) => [state.isLogedIn]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const userSession = await getUserSession();

        if (userSession.session) {
          setUser(userSession.session.user);
          try {
            let { data } = await supabase.from('purchase_order').select('*').eq('user_id', userSession.session.user.id);
            if (data) {
              setProductItems(data);
            }
          } catch (e) {
            console.log(e);
          }
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

    getData();
  }, [isLogedIn]);

  if (productItems) {
    console.log(productItems);
  }

  return (
    <main className="bg-gray-100 py-24 min-h-screen p-14">
      {isLoading && <Loading />}
      {productItems && (
        <Table className="mx-auto w-[80%] max-w-[75rem]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Tanggal</TableHead>
              <TableHead>Nama Barang</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Jumlah Harga</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productItems.map((order) => (
              <OrderDetail key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
}
