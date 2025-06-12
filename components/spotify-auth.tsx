"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Music } from "lucide-react"

// Configurações do Spotify (substitua pelos seus valores)
const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "your_client_id"
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000/callback"
const SCOPES = "user-read-currently-playing user-read-playback-state"

export default function SpotifyAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    // Verificar se há token no localStorage
    const token = localStorage.getItem("spotify_access_token")
    if (token) {
      setAccessToken(token)
    }

    // Verificar se há código de autorização na URL
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    if (code && !token) {
      exchangeCodeForToken(code)
    }
  }, [])

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch("/api/spotify/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (data.access_token) {
        localStorage.setItem("spotify_access_token", data.access_token)
        setAccessToken(data.access_token)

        // Limpar URL
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    } catch (error) {
      console.error("Erro ao trocar código por token:", error)
    }
  }

  const loginWithSpotify = () => {
    const authUrl =
      `https://accounts.spotify.com/authorize?` +
      `client_id=${SPOTIFY_CLIENT_ID}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `scope=${encodeURIComponent(SCOPES)}`

    window.location.href = authUrl
  }

  const logout = () => {
    localStorage.removeItem("spotify_access_token")
    setAccessToken(null)
  }

  if (accessToken) {
    return (
      <Card className="bg-black/80 backdrop-blur-sm text-white">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4 text-green-500" />
              <span className="text-xs">Conectado ao Spotify</span>
            </div>
            <Button size="sm" variant="ghost" onClick={logout} className="text-xs">
              Desconectar
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/80 backdrop-blur-sm text-white">
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Music className="h-4 w-4" />
          Conectar Spotify
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <Button size="sm" onClick={loginWithSpotify} className="w-full bg-green-600 hover:bg-green-700 text-xs">
          Conectar
        </Button>
      </CardContent>
    </Card>
  )
}
