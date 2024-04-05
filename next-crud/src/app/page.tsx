'use client'
import { getProducts } from '@/services/ecommerceService'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function PrincipalPage() {
  const [products, setProducts] = useState<any>([])
  const {push} = useRouter()

  const loadProducts = async () => {
    const response = await getProducts()
    const contactsData = response.data
    console.log('asdasdasdasd', contactsData)
    setProducts(contactsData)
  }

  const loadRandomImage = () => {
    const images: string[] = [
      'https://images.kabum.com.br/produtos/fotos/382252/notebook-samsung-book-intel-core-i5-1135g7-8gb-ram-ssd-256gb-15-6-full-hd-geforce-mx450-windows-11-branco-puro-np550xda-xh1br_1662483233_original.jpg',
      'https://images.kabum.com.br/produtos/fotos/527012/notebook-gamer-acer-nitro-5-intel-core-i7-16gb-ram-geforce-rtx-3050-ssd-512gb-17-3-fhd-linux-preto-com-vermelho-an517-54-765v_1709304791_gg.jpg',
      'https://images.kabum.com.br/produtos/fotos/518064/notebook-gamer-asus-tuf-gaming-f15-fx507vu-intel-core-i7-13620h-rtx-4050-16gb-ram-ssd-512gb-15-6-led-fhd-144hz-w11h-fx507vu-lp177w_1711033059_gg.jpg',
      'https://images.kabum.com.br/produtos/fotos/393218/notebook-asus-vivobook-15-amd-ryzen-5-4600h-8gb-ram-ssd-256gb-15-6-full-hd-amd-radeon-graphics-win-11-prata-metalico-m1502ia-ej251w_1710269786_gg.jpg',
      'https://images.kabum.com.br/produtos/fotos/477142/notebook-gamer-asus-vivobook-16x-intel-core-i5-12450h-8gb-ssd-512gb-tela-16-rtx-2050-win-11-preto-k3605zf-n1198w_1704277052_gg.jpg',
      'https://images.kabum.com.br/produtos/fotos/467613/notebook-gamer-asus-rog-srix-g16-intel-core-i9-13980hx-16gb-ram-geforce-rtx-4060-ssd-512gb-16-fhd-win-11-cinza-g614jv-n3094w_1688414835_gg.jpg'
    ]
    const randomIndex = Math.floor(Math.random() * images.length)
    return images[randomIndex]
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      push('/login')
    }
    loadProducts()
  }, [])

  return (
    <section className="mx-auto max-w-[85%] flex flex-col items-center justify-center mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-16">
        {products?.rows?.map((product: any) => {
          console.log(product)
          return (
            <Link href={`/teste/${product.id}`}>
              <div
                key={product.id}
                className="flex flex-col items-center justify-center max-w-xs bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-gray-400"
              >
                <img
                  className="h-40 w-full object-cover"
                  src={loadRandomImage()}
                  alt="product"
                />
                <div className="p-4">
                  <h1 className="text-gray-900 font-bold text-lg">
                    {product.name}
                  </h1>
                  <p className="text-gray-700 text-sm">
                    <span className="bg-blue-300 px-2 py-1 rounded-md text-white">
                      R${product.price},00
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
