'use client';
import { useShallow } from 'zustand/react/shallow';
import useCartStore from '@/store/cart-store';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToastUi } from '@/hooks/use-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Loading from '@/components/ui/loading';
import supabase from '@/config/supabaseClient';
import { notFound } from 'next/navigation';

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addItem] = useCartStore(
    useShallow((state) => {
      return [state.addItem];
    })
  );

  const slug = params.slugProduct;
  const toast = useToastUi();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.from('product_items').select('*').eq('slug', slug);

        if (data) {
          setProduct(data[0]);
        }
      } catch (e) {
        setError(e);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    notFound();
  }

  return (
    <main className={`w-full bg-gray-100 py-16 ${product ? 'h-max' : 'h-screen'}`}>
      {isLoading && <Loading />}
      {product && (
        <div className="flex flex-col md:flex-row gap-[3rem]  pt-8 md:pt-24 mx-auto w-full max-w-[75rem] items-center">
          <div className="w-full md:w-[40rem]">
            <Image src={product.image} alt={product.title} className="mx-auto" width={250} height={200} />
          </div>
          <div className="w-[80%]  md:w-full flex flex-col justify-around pb-12">
            <div>
              <h1 className="font-bold text-2xl">{product.title}</h1>
              <p>
                <span className="font-semibold">Deskripsi </span> : {product.description}
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <h3 className="text-2xl  mb-4">
                <span className="font-semibold">Harga </span> : Rp {product.price}
              </h3>
              <div>
                <Button
                  className="w-full sm:w-80"
                  onClick={() => {
                    addItem(product);
                    toast('addtocart', 'Berhasil ditambahkan!');
                  }}
                >
                  Tambah ke Keranjang
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
