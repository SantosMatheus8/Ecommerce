'use client'
import { useCartStore } from '@/store/cart'
import Link from 'next/link';

export default function Header() {
  const { items } = useCartStore() as { items: any[] }

  return (
    <header>
      <nav className="bg-gray-300 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <Link href="/">
              <p className="text-gray-700 text-lg font-semibold">Bar do Igao</p>
            </Link>
          </div>
          <div>
            <Link href="/cart">
              <p className="text-gray-700 text-lg font-semibold flex items-center">
                Carrinho
                <span className="ml-2">{items.length}</span>
              </p>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
