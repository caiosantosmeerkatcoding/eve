"use client"

import { QRCodeSVG } from "qrcode.react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

export default function QRCodePage() {
  const appUrl = typeof window !== "undefined" ? `${window.location.origin}` : "https://your-app-url.vercel.app"

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-red-500 animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Escaneie para Acessar</CardTitle>
          <p className="text-gray-600 text-sm">Uma surpresa especial te aguarda ❤️</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <QRCodeSVG value={appUrl} size={200} bgColor="#ffffff" fgColor="#000000" level="M" includeMargin={false} />
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">Aponte a câmera do seu celular para o código QR</p>
        </CardContent>
      </Card>
    </div>
  )
}
