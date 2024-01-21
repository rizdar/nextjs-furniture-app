'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getUserSession, logout } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth-store';

import useCartStore from '@/store/cart-store';

export default function MainNavigation() {
  const router = useRouter();
  // const [isLogedIn, setIsLogedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [isLogedIn, setIsLogedIn] = useAuthStore((state) => [state.isLogedIn, state.setIsLogedIn]);
  const [items] = useCartStore((state) => [state.items]);

  useEffect(() => {
    const getUser = async () => {
      const userSession = await getUserSession();

      if (userSession.session) {
        setUser(userSession.session.user);
        setIsLogedIn(true);
      }
    };

    getUser();
  }, [isLogedIn]);

  async function handleLogout() {
    await logout();
    setUser(null);
    setIsLogedIn(false);
  }

  const totalQuantity = items.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.quantity;
  }, 0);

  return (
    <>
      <div className="flex justify-between items-center py-3 px-7 sm:px-32 z-10 fixed bg-white w-full">
        <h1 className="sm:text-xl">
          <Link href="/">
            Next<strong>Furniture</strong>
          </Link>
        </h1>

        <div className="flex items-center gap-3">
          <Link href="/products/cart">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                  clipRule="evenodd"
                />
              </svg>
              {totalQuantity > 0 && <span className="absolute top-[-50%] right-0 bg-red-500 text-white font-semibold rounded-full w-4 p-[4px] text-center text-xs">{totalQuantity}</span>}
            </div>
          </Link>
          {user && (
            <DropdownMenu className="fixed">
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36">
                <DropdownMenuLabel>{user.user_metadata.nama}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem onClick={() => router.push('/order/history')}>Pesanan Saya</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem onClick={handleLogout}>Keluar</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!user && (
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link href="/login">Masuk</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Daftar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
