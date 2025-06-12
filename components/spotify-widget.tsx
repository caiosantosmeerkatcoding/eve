"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, ExternalLink } from "lucide-react"

interface SpotifyTrack {
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  external_urls: {
    spotify: string
  }
  preview_url: string | null
  is_playing: boolean
}

export default function SpotifyWidget() {
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Função para buscar a música atual do Spotify
  const fetchCurrentTrack = async () => {
    try {
      // Aqui você precisará implementar a autenticação do Spotify
      // Por enquanto, vou simular dados para demonstração

      // Exemplo de como seria com a API real:
      /*
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
      
      if (response.status === 200) {
        const data = await response.json()
        setCurrentTrack(data.item)
      }
      */

      // Dados simulados para demonstração
      const mockTrack: SpotifyTrack = {
        name: "Make It Wit Chu",
        artists: [{ name: "Queens Of The Stone Age" }],
        album: {
          name: "÷ (Divide)",
          images: [{ url: "/images/spotify.png" }],
        },
        external_urls: {
          spotify: "https://open.spotify.com/playlist/5FvT56HS7xOsYJxhvpW2sA",
        },
        preview_url: null,
        is_playing: true,
      }

      setCurrentTrack(mockTrack)
      setIsLoading(false)
    } catch (err) {
      setError("Erro ao carregar música")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrentTrack()

    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchCurrentTrack, 30000)

    return () => clearInterval(interval)
  }, [])

  // Widget compacto para economizar espaço
  if (isLoading) {
    return (
      <Button
        size="sm"
        variant="ghost"
        className="bg-black/50 backdrop-blur-sm text-white h-8 w-8 p-0 rounded-full"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Music className="h-4 w-4 animate-pulse" />
      </Button>
    )
  }

  if (error || !currentTrack) {
    return (
      <Button
        size="sm"
        variant="ghost"
        className="bg-black/50 backdrop-blur-sm text-white h-8 w-8 p-0 rounded-full"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Music className="h-4 w-4" />
      </Button>
    )
  }

  // Widget compacto (ícone)
  if (!isExpanded) {
    return (
      <Button
        size="sm"
        variant="ghost"
        className="bg-black/70 backdrop-blur-sm text-green-500 h-8 w-8 p-0 rounded-full"
        onClick={() => setIsExpanded(true)}
      >
        <Music className="h-4 w-4" />
      </Button>
    )
  }

  // Widget expandido
  return (
    <Card className="bg-black/90 backdrop-blur-sm text-white max-w-[200px]">
      <CardContent className="p-2">
        <div className="flex items-center gap-2">
          {/* Close Button */}
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-gray-400 hover:text-white"
            onClick={() => setIsExpanded(false)}
          >
            ×
          </Button>

          {/* Album Art */}
          <div className="relative">
            <img
              src={currentTrack.album.images[0]?.url || "/placeholder.svg?height=32&width=32"}
              alt={currentTrack.album.name}
              className="w-8 h-8 rounded object-cover"
            />
            {currentTrack.is_playing && <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full" />}
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{currentTrack.name}</p>
            <p className="text-xs text-gray-400 truncate">
              {currentTrack.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>

          {/* Spotify Link */}
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-green-500 hover:text-green-400"
            onClick={() => window.open(currentTrack.external_urls.spotify, "_blank")}
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
