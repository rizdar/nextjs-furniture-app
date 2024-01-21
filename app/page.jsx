import Hero from '@/components/header/Hero';
import Products from '@/components/products/Products';

export default function Home() {
  return (
    <main className="bg-gray-100">
      <Hero />
      <Products />
    </main>
  );
}
