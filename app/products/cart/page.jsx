'use client';
import { useShallow } from 'zustand/react/shallow';
import useCartStore from '@/store/cart-store';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getUserSession } from '@/utils/auth';
import { useState, useEffect } from 'react';
import useAuthStore from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import AlertDialogComponent from '@/components/ui/alert-component';

export default function CartPage() {
  const [isLogedIn] = useAuthStore((state) => [state.isLogedIn]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const userSession = await getUserSession();

      if (userSession.session) {
        setUser(userSession.session.user);
        router.refresh();
      }
    };

    getUser();
  }, [isLogedIn]);

  const [items, totalAmount, incrementQuantity, decrementQuantity, removeItem, clearCart] = useCartStore(
    useShallow((state) => {
      return [state.items, state.totalAmount, state.incrementQuantity, state.decrementQuantity, state.removeItem, state.clearCart];
    })
  );

  return (
    <main className={`bg-gray-100 py-24 ${items.length > 0 ? 'h-max' : 'h-screen'}`}>
      <div className="w-[80%] md:w-6/12  mx-auto">
        <Card>
          <CardHeader className="text-2xl md:text-3xl uppercase font-semibold text-center">Keranjang</CardHeader>
          <CardContent>
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="mb-4 border-b-2 pb-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-md md:text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm md:text-md text-gray-700">Harga: Rp {item.price}</p>
                    <p className="text-sm md:text-md text-gray-700">Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button onClick={() => decrementQuantity(item.id)} variant="outline">
                      -
                    </Button>
                    <span className="text-md md:text-xl">{item.quantity}</span>
                    <Button onClick={() => incrementQuantity(item.id)} variant="outline">
                      +
                    </Button>
                    <AlertDialogComponent onConfirm={() => removeItem(item.id)} title={`Hapus ${item.title} dari keranjang ?`} description="dengan menghapusnya maka item tersebut tidak ada lagi dikeranjang!">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </AlertDialogComponent>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <h3 className=" font-semibold">Keranjang Kosong</h3>
                <Link href="/">
                  <p className="text-blue-500">Kembali ke list produk!</p>
                </Link>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {items.length > 0 && (
              <div className="flex flex-col gap-3 w-full">
                <h2 className="text-xl md:text-2xl font-semibold md:mt-4 mt-1">Total Bayar : Rp {totalAmount}</h2>
                {(!user || !isLogedIn) && <p className="text-sm md:text-md text-red-500">*Login terlebih dahulu untuk dapat membayar </p>}
                <Link href="/checkout">
                  <Button className="w-full" disabled={!user || !isLogedIn}>
                    Bayar
                  </Button>
                </Link>
                <AlertDialogComponent onConfirm={() => clearCart()} title="Hapus semua item ?" description="Keranjang akan kosong jika anda menghapus semua items!">
                  <Button className="w-full" variant="outline">
                    Hapus Semua
                  </Button>
                </AlertDialogComponent>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
