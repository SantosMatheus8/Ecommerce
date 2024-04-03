'use client'

import { getOrder } from "@/services/ecommerceService"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DetailOrder() {
    const [order, setOrder] = useState<any>({})
    const params = useParams()

    const returnOrder = async () => {
        const fetchedOrder = await getOrder(params.id as string)
        setOrder(fetchedOrder.data)
    }

    useEffect(() => {
        returnOrder()
    }, [])

    return (
        <section className="mb-20 mt-20">
            <div className="container mx-auto">
                <h1 className="text-3xl font-semibold mb-4">Detalhes do Pedido</h1>
                {order && (
                    <div className="bg-white rounded-md p-4 shadow-md">
                        <p className="text-gray-700">Valor total do pedido: R${order.totalValue}</p>
                        <h3 className="text-lg font-semibold mt-4">Produtos:</h3>
                        {order.products && order.products.map((product: any, index: number) => (
                            <div key={index} className="mt-4">
                                <p className="text-gray-800 font-semibold">{product.name}</p>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-gray-700">Preço: R${product.price}</p>
                                {index !== order.products.length - 1 && <hr className="mt-4"/>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
