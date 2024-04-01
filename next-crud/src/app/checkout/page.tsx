import React from 'react'

export default function Checkout() {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen mt-20">
      <svg
        className="w-24 h-24 text-green-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <h1 className="text-3xl font-semibold text-green-500 mb-2">
        Compra realizada com sucesso
      </h1>
      <p className="text-lg text-gray-700">
        Obrigado por comprar conosco! Seu pedido foi processado com sucesso.
      </p>
    </div>
  )
}
