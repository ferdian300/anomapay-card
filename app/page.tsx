'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import html2canvas from 'html2canvas'

interface CardData {
  name: string
  cardNumber: string
  expiryDate: string
  cvv: string
}

export default function Home() {
  const [cardData, setCardData] = useState<CardData>({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const [generatedCard, setGeneratedCard] = useState<CardData | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const generateRandomCard = () => {
    if (!cardData.name.trim()) {
      alert('Please enter a name first!')
      return
    }

    // Generate random card number (16 digits)
    const cardNumber = Array.from({ length: 16 }, () => 
      Math.floor(Math.random() * 10)
    ).join('')

    // Generate random expiry date (MM/YY format)
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
    const year = String(Math.floor(Math.random() * 10) + 25) // 2025-2034
    const expiryDate = `${month}/${year}`

    // Generate random CVV (3 digits)
    const cvv = String(Math.floor(Math.random() * 900) + 100)

    const newCard: CardData = {
      name: cardData.name,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv
    }

    setGeneratedCard(newCard)
  }

  const downloadCard = async () => {
    if (!cardRef.current) return

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#1a1a1a',
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: 320,
        height: 192,
        scrollX: 0,
        scrollY: 0
      })

      const link = document.createElement('a')
      link.download = `anoma-pay-card-${cardData.name.replace(/\s+/g, '-')}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    } catch (error) {
      console.error('Error generating card image:', error)
      alert('Error generating card image. Please try again.')
    }
  }

  const resetCard = () => {
    setGeneratedCard(null)
    setCardData({ name: '', cardNumber: '', expiryDate: '', cvv: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black text-red-600 mb-4">
            ANOMA PAY CARD GENERATOR
          </h1>
          <p className="text-2xl text-gray-300 font-bold">
            Create your own <span className="text-red-500">FUNNY</span> payment card! No registration needed! 
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 mb-8 border-2 border-red-600">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <input
              type="text"
              placeholder="Enter your name (e.g., John Doe)"
              value={cardData.name}
              onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
              className="flex-1 px-6 py-4 rounded-2xl bg-gray-700 text-white placeholder-gray-400 border-2 border-red-600 focus:outline-none focus:ring-4 focus:ring-red-500/50 font-bold text-lg input-focus"
            />
            <button
              onClick={generateRandomCard}
              className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-black rounded-2xl text-xl transform hover:scale-105 transition-all duration-300 btn-hover"
            >
               Generate Card
            </button>
          </div>
        </div>

        {/* Generated Card Display */}
        {generatedCard && (
          <div className="space-y-8">
            {/* Card Preview */}
            <div className="flex justify-center">
              <div
                ref={cardRef}
                className="card-export relative text-white"
                style={{
                  width: '320px',
                  height: '192px',
                  background: 'linear-gradient(135deg,rgb(41, 13, 13) 0%,rgb(112, 33, 33) 100%)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '20px'
                }}
              >
                {/* Card Logo */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="card-logo w-12 h-12 flex items-center justify-center overflow-hidden">
                      <Image 
                        src="/logo.jpg" 
                        alt="Anoma Pay Logo" 
                        width={48} 
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-1x1 font-black text-white card-text">ANOMA PAY CARD</div>
                  </div>
                  <div className="w-12 h-12 bg-white/112 rounded-full ">
                    <span className="text-xl"></span>
                  </div>
                </div>

                {/* Card Number */}
                <div className="mb-4">
                  <div className="text-xs text-white/70 mb-1 font-bold card-text">Card Number</div>
                  <div className="text-lg font-black tracking-wider text-white card-text">
                    {generatedCard.cardNumber.match(/.{1,4}/g)?.join(' ')}
                  </div>
                </div>

                {/* Card Details */}
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <div className="text-xs text-white/70 font-bold card-text">Cardholder Name</div>
                    <div className="text-base font-black text-white card-text">{generatedCard.name.toUpperCase()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/70 font-bold card-text">Expires</div>
                    <div className="text-base font-black text-white card-text">{generatedCard.expiryDate}</div>
                  </div>
                </div>

                {/* CVV */}
                <div className="absolute bottom-4 right-4">
                  <div className="text-xs text-white/80 mb-1 font-bold card-text">CVV</div>
                  <div className="text-sm font-black bg-white/20 px-2 py-1 rounded border border-white/30">
                    {generatedCard.cvv}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 bg-white/10 rounded-full"></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={resetCard}
                className="px-10 py-4 bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800 text-white font-black rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 border-2 border-red-800 shadow-lg btn-hover"
              >
                 Generate New Card
              </button>
            </div>

            {/* Card Info Display */}
            <div className="bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 border-2 border-red-600">
              <h3 className="text-2xl font-black text-red-500 mb-6 text-center"> Your Card Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div className="bg-gray-700/50 rounded-2xl p-4 border border-red-600">
                  <div className="text-gray-300 text-sm font-bold mb-2">Card Number</div>
                  <div className="text-white font-black text-lg">{generatedCard.cardNumber}</div>
                </div>
                <div className="bg-gray-700/50 rounded-2xl p-4 border border-red-600">
                  <div className="text-gray-300 text-sm font-bold mb-2">Expiry Date</div>
                  <div className="text-white font-black text-lg">{generatedCard.expiryDate}</div>
                </div>
                <div className="bg-gray-700/50 rounded-2xl p-4 border border-red-600">
                  <div className="text-gray-300 text-sm font-bold mb-2">CVV</div>
                  <div className="text-white font-black text-lg">{generatedCard.cvv}</div>
                </div>
                <div className="bg-gray-700/50 rounded-2xl p-4 border border-red-600">
                  <div className="text-gray-300 text-sm font-bold mb-2">Cardholder</div>
                  <div className="text-white font-black text-lg">{generatedCard.name}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400 font-bold">
          <p className="text-xl">
             This is just for fun! Not a real payment card!
          </p>
          <p className="text-lg mt-3 text-red-500">
            Made with ❤️ because i love anoma pay tech
          </p>
          <p className="text-lg text-red-500">
            fredianmercurry is here
          </p>
        </div>
      </div>
    </div>
  )
}
