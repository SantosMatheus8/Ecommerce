'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getProduct } from '@/services/contactService'
import Link from 'next/link'

export default function Teste() {
  const params = useParams()
  const [product, setProduct] = useState<any>([])

  const loadProducts = async () => {
    const response = await getProduct(params.id as string)
    const productData = response.data
    setProduct(productData)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  console.log('/eopara', product)
  return (
    <section className="max-w-4xl mx-auto mt-8 px-4 flex flex-col items-center justify-center">
      <h1 className="mt-5 mb-20 text-6xl">Americanas</h1>
  
      <Link href={`/`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Voltar para a Loja
        </button>
      </Link>
      <div className="flex items-center">
        <img
          className="h-80 w-80 object-cover mr-6"
          src="https://images.kabum.com.br/produtos/fotos/382252/notebook-samsung-book-intel-core-i5-1135g7-8gb-ram-ssd-256gb-15-6-full-hd-geforce-mx450-windows-11-branco-puro-np550xda-xh1br_1662483233_original.jpg"
          alt="product"
        />
        <div className="bg-white rounded-lg overflow-hidden shadow-lg flex-1">
          <div className="p-6"> 
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-lg font-semibold text-blue-700 mb-2">
              R${product.price}
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </section>
  );
  
}
