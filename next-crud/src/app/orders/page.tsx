'use client'

import { getOrders } from '@/services/ecommerceService'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MyOrdersList() {
  const [orders, setOrders] = useState<any>([])
  const { push } = useRouter()

  const returnOrders = async () => {
    const orders = await getOrders()
    setOrders(orders)
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      push('/login')
    }
    returnOrders()
  }, [])
  return (
    <section className="mb-20 mt-20">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Meus Pedidos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {orders.data?.rows.length ? (
            orders.data.rows.map((order: any, index: any) => (
              <Link href={`/detailOrder/${order.id}`}>
                <div
                  key={order.id}
                  className="bg-white shadow-md rounded-md p-4"
                >
                  <h2 className="text-xl font-semibold">
                    Pedido : {index + 1}
                  </h2>
                  <p className="text-gray-700">
                    Valor total : R${order.totalValue},00
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-700 text-xl mt-8">
              Você não tem pedidos
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
