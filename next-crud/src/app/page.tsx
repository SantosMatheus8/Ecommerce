'use client'
import { getProducts } from '@/services/contactService'
import React, { useState, useEffect } from 'react'

export default function PrincipalPage() {
  const [products, setProducts] = useState<any>([])

  const loadProducts = async () => {
    const response = await getProducts()
    const contactsData = response.data
    console.log('asdasdasdasd', contactsData)
    setProducts(contactsData)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <section className="mx-auto max-w-[85%] flex flex-col items-center justify-center">
      <h1 className="mt-5 mb-20 text-3xl">Americanas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-16">
        {products?.rows?.map((product: any) => {
          console.log(product)
          return (
            <div
              key={product.id}
              className="flex flex-col items-center justify-center max-w-xs bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-gray-400"
            >
              <img
                className="h-40 w-full object-cover"
                src="https://images.kabum.com.br/produtos/fotos/382252/notebook-samsung-book-intel-core-i5-1135g7-8gb-ram-ssd-256gb-15-6-full-hd-geforce-mx450-windows-11-branco-puro-np550xda-xh1br_1662483233_original.jpg"
                alt="product"
              />
              <div className="p-4">
                <h1 className="text-gray-900 font-bold text-lg">
                  {product.name}
                </h1>
                <p className="text-gray-700 text-sm">
                  <span className="bg-blue-300 px-2 py-1 rounded-md text-white">
                    {product.price}
                  </span>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
