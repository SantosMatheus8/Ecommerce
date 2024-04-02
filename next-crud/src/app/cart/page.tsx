'use client'
import { createOrder } from '@/services/ecommerceService'
import { useCartStore } from '@/store/cart'
import Link from 'next/link'
import { useState } from 'react'

export default function ShoppingCart() {
  const { items, removeItem, clearItems } = useCartStore() as {
    items: any[]
    removeItem: (index: number) => void
    clearItems: () => void
  }
  const [quantities, setQuantities] = useState<number[]>(items.map(() => 1))

  const updateQuantity = (index: number, value: number) => {
    const newQuantities = [...quantities]
    newQuantities[index] = value
    setQuantities(newQuantities)
  }

  const checkout = (products: any[]) => {
    const newProduct = products.map((product, index) => {
      product.quantity = quantities[index]
      return product
    })
    clearItems()
    const userId: any = localStorage.getItem('userId')
    createOrder({ userId, products: newProduct })
  }

  const total = items.reduce(
    (acc, curr, index) => acc + curr.price * quantities[index],
    0,
  )

  return (
    <section className="mb-20 mt-20">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Carrinho de Compras</h1>
        {items.length ? (
          items.map((item, index) => (
            <div
              key={index}
              className="border-b py-4 flex items-center justify-between shadow-md mb-4"
            >
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">
                  Preço: R${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={quantities[index]}
                  onChange={(e) =>
                    updateQuantity(index, parseInt(e.target.value))
                  }
                  className="mr-4 w-16 py-1 px-2 border border-gray-300 rounded"
                />
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => removeItem(item)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 text-xl mt-8">
            Seu carrinho está vazio
          </p>
        )}

        {items.length > 0 && (
          <>
            <div className="mt-8">
              <p className="text-lg font-semibold">
                Total: R${total.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-end mt-8">
              <Link
                onClick={() => checkout(items)}
                href="/checkout"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Finalizar Compra
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
