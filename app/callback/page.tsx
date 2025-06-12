"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Music } from "lucide-react"

export default function SpotifyCallback() {
  useEffect(() => {
    // Redirecionar de volta para a página principal
    const timer = setTimeout(() => {
      window.location.href = "/"
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 flex items-center justify-center p-4">
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
        <CardContent className="p-8 text-center">
          <Music className="h-12 w-12 text-green-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Conectando ao Spotify...</h2>
          <p className="text-gray-600 text-sm">Você será redirecionado em instantes</p>
        </CardContent>
      </Card>
    </div>
  )
}
