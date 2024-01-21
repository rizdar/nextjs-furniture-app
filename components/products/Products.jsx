import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '../ui/loading';
import supabase from '@/config/supabaseClient';

export default async function Products() {
  const { data: products, error } = await supabase.from('product_items').select('*');

  return (
    <section className="w-10/12 mx-auto  md:px-20 py-12">
      <h3 className="text-xl font-bold text-center mb-8">Produk</h3>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-wrap">
          {products.map((product) => (
            <div key={product.title} className="mx-auto">
              <Link href={`products/${product.slug}`}>
                <Card className="w-72 p-4 mb-8">
                  <CardContent>
                    <Image src={product.image} alt={product.title} className="object-cover" width={300} height={500} />
                  </CardContent>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.description.slice(1, 20)}</CardDescription>
                  <h4>Rp.{product.price}</h4>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </Suspense>
    </section>
  );
}
