import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-[80%]">
        <h2 className="text-xl md:text-3xl font-bold mb-4 text-primary">Pemesanan Berhasil!</h2>
        <p className="text-gray-600 mb-8">Terima kasih atas pemesanan Anda. Pesanan Anda telah berhasil diproses.</p>
        <Link href="/">
          <Button>Kembali ke beranda</Button>
        </Link>
      </div>
    </div>
  );
}
