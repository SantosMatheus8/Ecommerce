'use client'
import { createProduct } from '@/services/ecommerceService'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Product {
  name: string
  description: string
  price: number
  quantity: number
}

const ProductForm = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  })
  const [successMessage, setSuccessMessage] = useState<string>('')
  const { push } = useRouter()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createProduct(product)
      setSuccessMessage('Produto criado com sucesso!')
      setProduct({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
      })
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      setSuccessMessage('Ocorreu um erro ao criar o produto.')
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      push('/login')
    }
  }, [])

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Produto</h1>
      {successMessage && (
        <div className="mb-4 text-green-700 font-bold">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Descrição:
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Preço:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-gray-700 font-bold mb-2"
          >
            Quantidade:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Cadastrar Produto
        </button>
      </form>
    </div>
  )
}

export default ProductForm
