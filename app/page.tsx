"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Heart,
  Calendar,
  MapPin,
  Music,
  Mic,
  Camera,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Gift,
  Infinity as InfinityIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import SpotifyWidget from "@/components/spotify-widget"

// Datas importantes do relacionamento (ajuste conforme necessário)
const RELATIONSHIP_START = new Date("2019-07-28") // Data que começaram a namorar
const FIRST_TRIP = new Date("2020-02-20") // Primeira viagem
const FIRST_FESTIVAL = new Date("2023-03-22") // Primeiro festival
const ENGAGEMENT_DATE = new Date("2023-09-09") // Data do pedido de noivado

const memories = [
  {
    id: 0,
    type: "intro",
    title: "Um Presente Especial",
    subtitle: "De Caio para Evelin ❤️",
    description:
      "Este é um presente simbólico registrando nossos momentos mais especiais juntos. Cada página conta uma parte da nossa história de amor.",
    startDate: new Date(),
    icon: Gift,
    images: [], // Remover todas as imagens
    duration: null, // Não passa automaticamente
  },
  {
    id: 1,
    type: "love",
    title: "Te amo há {days} dias",
    subtitle: "Desde o primeiro momento, meu coração é seu ❤️",
    description: "Cada dia ao seu lado é uma nova descoberta do que é o amor",
    startDate: RELATIONSHIP_START,
    icon: Heart,
    images: [
      "/images/foto1.jpg",
      "/images/foto8.jpg",
      "/images/foto3.jpg",
      "/images/foto4.jpg",
      "/images/seis.jpg",
    ],
    duration: null, // Não passa automaticamente
  },
  {
    id: 2,
    type: "trip",
    title: "Nossa primeira viagem foi há {days} dias",
    subtitle: "Exploramos Recife juntos, e foi um dos muitos locais que estamos adicionando em nossa coleção 🌎",
    description: "A primeira de muitas aventuras que vivemos lado a lado",
    startDate: FIRST_TRIP,
    icon: MapPin,
    images: [
      "/images/viagem1.jpg",
      "/images/viagem2.jpg",
    ],
    duration: null, // Não passa automaticamente
  },
  {
    id: 3,
    type: "festival",
    title: "Fazem {days} dias desde o nosso primeiro festival",
    subtitle: "Nesse dia iniciamos um hobbie, viajar o Brasil atrás de festivais 😁",
    description: "Música, dança e você - a combinação perfeita",
    startDate: FIRST_FESTIVAL,
    icon: Music,
    images: ["/images/festival.png"],
    duration: null, // Não passa automaticamente
  },
  {
    id: 4,
    type: "engagement",
    title: "Há {days} dias eu te pedi em noivado",
    subtitle: "Um dos dias mais especiais (e nervosos) da minha vida 💍",
    description: "Quando você disse sim, meu mundo ficou completo",
    startDate: ENGAGEMENT_DATE,
    icon: Sparkles,
    images: [
      "/images/noivado1.jpg",
      "/images/noivado3.jpg",
      "/images/noivado4.jpg",
    ],
    duration: null, // Não passa automaticamente
  },
  {
    id: 5,
    type: "shows",
    title: "Fomos em tantos shows",
    subtitle: "E estar com você tornou essa experiência mais especial 🎤",
    description: "Cada música, cada momento, cada show foi único ao seu lado",
    startDate: RELATIONSHIP_START,
    icon: Mic,
    images: [
      "/images/rnr1.jpg",
      "/images/rnr5.jpg",
      "/images/rnr2.jpg",
      "/images/rnr3.jpg",
      
    ],
    duration: null, // Não passa automaticamente
  },
  {
    id: 6,
    type: "adventures",
    title: "Durante esse período, conhecemos tantos lugares",
    subtitle: "Foram tantas aventuras 🗺️✨",
    description: "Cada lugar visitado, cada aventura vivida, sempre juntos",
    startDate: RELATIONSHIP_START,
    icon: Camera,
    images: [
      "/images/um.jpg", // Slide 1
      "/images/dois.jpg", // Slide 2
      "/images/foto21.jpg", // Slide 3
      "/images/foto22.jpg", // Slide 4
      "/images/foto27.jpg", // Slide 5
      "/images/foto10.jpg", // Slide 6
      "/images/tres.jpg", // Slide 7
      "/images/foto18.jpg", // Slide 8
      "/images/foto19.jpg", // Slide 9
      "/images/foto20.jpg", // Slide 10
      "/images/foto23.jpg", // Slide 11
      "/images/foto25.jpg", // Slide 12
      "/images/quatro.jpg", // Slide 13
   
    ],
    imageInterval: 10000, // 10 segundos por imagem conforme solicitado
    duration: null, // Não passa automaticamente
  },
  {
    id: 7,
    type: "final",
    title: "Te amo, princesa",
    subtitle: "Quero viver infinitas aventuras contigo 💕",
    description:
      "Aqui é a parte que eu revelo pra você que nesse exato momento que estou criando esse app a gente está assistindo Dragon Ball, agora já se passaram algumas horas e você está irritada porque ainda não fui deitar. Amo tudo que fazemos juntos e sua companhia é que torna essas experiências prazerosas ❤️",
    startDate: RELATIONSHIP_START,
    icon: Heart,
    images: [
      "/images/foto24.jpg", // Foto especial final
    ],
    duration: null, // Não passa automaticamente
  },
  {
    id: 8,
    type: "conclusion",
    title: "Feliz dia dos namorados!",
    subtitle: "Te amo bae",
    description:
      "Quando me pediu para fazer uma playlist eu pensei em fazer algo a mais, talvez esteja totalmente bugado pois não terei tempo de testar (tenho que ir dormir são 1 da manhã) mas sei que você irá relevar 😝. Ah, é só clicar na nota musical acima para acessar sua playlist, ou no ícone abaixo para reiniciar essa galeria, beijos.",
    startDate: new Date(),
    icon: InfinityIcon,
    images: [], // Sem imagens
    duration: null, // Não passa automaticamente
  },
]

function calculateDays(startDate: Date): number {
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function ValentineApp() {
  const [currentMemory, setCurrentMemory] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(0)
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const [heartFillProgress, setHeartFillProgress] = useState(0)
  const [isHeartFilling, setIsHeartFilling] = useState(false)
  const [infinityFillProgress, setInfinityFillProgress] = useState(0)
  const [isInfinityFilling, setIsInfinityFilling] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [imageProgress, setImageProgress] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const imageAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentMemoryData = memories[currentMemory]
  const isAdventuresSection = currentMemoryData.type === "adventures"
  const isFinalSection = currentMemoryData.type === "final"
  const isIntroSection = currentMemoryData.type === "intro"
  const isConclusionSection = currentMemoryData.type === "conclusion"

  // Inicializar o áudio
  useEffect(() => {
    audioRef.current = new Audio("/images/queens.mp3")
    audioRef.current.loop = true
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Controlar a reprodução da música baseado na página atual
  useEffect(() => {
    if (!audioRef.current) return

    if (currentMemory !== 0) {
      // Tentar reproduzir a música para todas as páginas exceto a primeira
      audioRef.current.play().catch(e => {
        console.warn("Reprodução automática bloqueada:", e)
        // Podemos adicionar um botão de "play" manual aqui se necessário
      })
    } else {
      // Pausar na primeira página
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [currentMemory])

  // Função para limpar timers
  const clearTimers = () => {
    if (imageAdvanceTimerRef.current) {
      clearTimeout(imageAdvanceTimerRef.current)
      imageAdvanceTimerRef.current = null
    }
    if (progressTimerRef.current) {
      clearTimeout(progressTimerRef.current)
      progressTimerRef.current = null
    }
  }

  // Função para preencher o coração
  const fillHeart = () => {
    if (isHeartFilling) return;

    // 1. Criar e tocar o som
    const popSound = new Audio("/images/poping.mp3");
    popSound.play().catch((e) => {
      console.warn("Falha ao tocar som:", e);
    });

    setIsHeartFilling(true);
    const duration = 2000; // 2 segundos para preencher
    const steps = 50;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const fillInterval = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps) * 100;
      setHeartFillProgress(progress);

      if (currentStep >= steps) {
        clearInterval(fillInterval);
        // Aguardar um pouco antes de avançar
        setTimeout(() => {
          goToNextMemory();
        }, 500);
      }
    }, stepDuration);
  };

  // Função para preencher o infinito
  const fillInfinity = () => {
    if (isInfinityFilling) return

    setIsInfinityFilling(true)
    const duration = 2000 // 2 segundos para preencher
    const steps = 50
    const stepDuration = duration / steps
    let currentStep = 0

    const fillInterval = setInterval(() => {
      currentStep++
      const progress = (currentStep / steps) * 100
      setInfinityFillProgress(progress)

      if (currentStep >= steps) {
        clearInterval(fillInterval)
        // Mostrar celebração
        setShowCelebration(true)
        // Aguardar 3 segundos e voltar ao início
        setTimeout(() => {
          setShowCelebration(false)
          setCurrentMemory(0)
          setCurrentImageIndex(0)
          setNextImageIndex(0)
          setShowFinalMessage(false)
          setHeartFillProgress(0)
          setIsHeartFilling(false)
          setInfinityFillProgress(0)
          setIsInfinityFilling(false)
          setImageProgress(0)
        }, 3000)
      }
    }, stepDuration)
  }

  // Função para avançar para a próxima memória
  const goToNextMemory = () => {
    clearTimers()
    if (currentMemory < memories.length - 1) {
      setCurrentMemory((prev) => prev + 1)
      setCurrentImageIndex(0)
      setNextImageIndex(0)
      setShowFinalMessage(false)
      setHeartFillProgress(0)
      setIsHeartFilling(false)
      setImageProgress(0)
    }
  }

  // Função para voltar para a memória anterior
  const goToPreviousMemory = () => {
    clearTimers()
    if (currentMemory > 0) {
      setCurrentMemory((prev) => prev - 1)
      setCurrentImageIndex(0)
      setNextImageIndex(0)
      setShowFinalMessage(false)
      setHeartFillProgress(0)
      setIsHeartFilling(false)
      setImageProgress(0)
    }
  }

  // Função para avançar para a próxima imagem
  const goToNextImage = () => {
    if (currentMemoryData.images && currentMemoryData.images.length > 1) {
      const nextIndex = (currentImageIndex + 1) % currentMemoryData.images.length
      setNextImageIndex(nextIndex)
      setIsTransitioning(true)
      
      // Inicia a transição
      setTimeout(() => {
        setCurrentImageIndex(nextIndex)
        setIsTransitioning(false)
      }, 500) // Tempo da transição em ms
    }
  }

  // Função para quando o usuário clica na imagem
  const handleImageClick = () => {
    // Verifica se há imagens suficientes para avançar
    if (!currentMemoryData.images || currentMemoryData.images.length < 2) return

    clearTimers()
    goToNextImage()
    startImageTimer()
  }

  // Função para iniciar o timer de imagens e progresso
  const startImageTimer = () => {
    if (currentMemoryData.images && currentMemoryData.images.length > 1) {
      clearTimers()
      setImageProgress(0)

      const interval = currentMemoryData.imageInterval || 10000
      const progressSteps = 100
      const progressStepDuration = interval / progressSteps
      let currentProgressStep = 0

      // Timer para o progresso
      progressTimerRef.current = setInterval(() => {
        currentProgressStep++
        const progress = (currentProgressStep / progressSteps) * 100
        setImageProgress(progress)

        if (currentProgressStep >= progressSteps) {
          clearInterval(progressTimerRef.current as NodeJS.Timeout)
        }
      }, progressStepDuration)

      // Timer para avançar a imagem
      imageAdvanceTimerRef.current = setTimeout(() => {
        goToNextImage()
        startImageTimer() // Reinicia o timer para a próxima imagem
      }, interval)
    }
  }

  // Auto-advance images apenas se houver múltiplas imagens
  useEffect(() => {
    if (currentMemoryData.images && currentMemoryData.images.length > 1) {
      startImageTimer()
    }

    return () => {
      clearTimers()
    }
  }, [currentMemory, currentImageIndex])

  // Mostrar mensagem final quando solicitado
  const handleShowFinalMessage = () => {
    setShowFinalMessage(true)
  }

  const daysCount = calculateDays(currentMemoryData.startDate)
  const rawTitle = currentMemoryData.title?.toString() ?? ""
  const titleWithDays = rawTitle.includes("{days}")
    ? rawTitle.replace("{days}", daysCount.toString())
    : rawTitle

  const IconComponent = currentMemoryData.icon

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-400 via-red-400 to-purple-500 overflow-hidden">
      {/* Background Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-white/15 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 16 + 8}px`,
            }}
          />
        ))}
      </div>

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {/* Confetti */}
          {[...Array(50)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute w-2 h-2 bg-yellow-400 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}

          {/* Flying Hearts */}
          {[...Array(30)].map((_, i) => (
            <Heart
              key={`heart-${i}`}
              className="absolute text-red-500 fill-red-500 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${Math.random() * 20 + 10}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Spotify Widget - Só aparece se não for a introdução (id=0) */}
      {currentMemory !== 0 && (
        <div className="absolute top-2 right-2 z-50">
          <SpotifyWidget />
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-40">
        <div className="h-0.5 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-300 ease-linear"
            style={{ width: `${((currentMemory + 1) / memories.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation Areas - Desabilitadas na página de intro e conclusão */}
      {!isIntroSection && !isConclusionSection && (
        <>
          <div
            className="absolute left-0 top-0 bottom-0 w-1/5 z-30 cursor-w-resize"
            onClick={goToPreviousMemory}
            aria-label="Página anterior"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-1/5 z-30 cursor-e-resize"
            onClick={goToNextMemory}
            aria-label="Próxima página"
          />
        </>
      )}

      {/* Navigation Indicators (only visible on touch) */}
      {!isIntroSection && !isConclusionSection && (
        <>
          <div className="absolute left-1 top-1/2 -translate-y-1/2 z-30 opacity-0 hover:opacity-50 touch-auto:opacity-50 transition-opacity">
            <ChevronLeft className="h-6 w-6 text-white bg-black/20 rounded-full p-1" />
          </div>
          <div className="absolute right-1 top-1/2 -translate-y-1/2 z-30 opacity-0 hover:opacity-50 touch-auto:opacity-50 transition-opacity">
            <ChevronRight className="h-6 w-6 text-white bg-black/20 rounded-full p-1" />
          </div>
        </>
      )}

      {/* Main Content - Otimizado para tela 2400x1080 */}
      <div className="h-full flex flex-col justify-center items-center px-3 py-2">
        <div className="w-full max-w-md flex flex-col items-center justify-center gap-3">
          {/* Image Carousel - Maior para aproveitar a tela */}
          {!isIntroSection && !isConclusionSection && currentMemoryData.images && currentMemoryData.images.length > 0 && (
            <div className="relative w-full rounded-xl overflow-hidden">
              {/* Progress Bar para as fotos - agora dentro do container da imagem com bordas arredondadas */}
              {currentMemoryData.images.length > 1 && (
                <div className="absolute top-0 left-0 right-0 z-10 h-0.5 bg-white/30 rounded-t-xl overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{ width: `${imageProgress}%` }}
                  />
                </div>
              )}

              <div
                className="relative w-full aspect-[3/4] max-h-[60vh] rounded-xl overflow-hidden mx-auto cursor-pointer"
                onClick={handleImageClick}
              >
                {/* Current Image */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                  {currentMemoryData.images.length > 0 ? (
                      <Image
                        src={currentMemoryData.images[currentImageIndex]}
                        alt="Memória especial"
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-black/30 text-white text-sm">
                        Sem imagem
                      </div>
                    )}
                </div>
                
                {/* Next Image (preloaded) */}
                {currentMemoryData.images.length > 1 && (
                  <div className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
                    {currentMemoryData.images.length > 1 && (
                      <Image
                        src={currentMemoryData.images[nextImageIndex]}
                        alt="Próxima memória"
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Image Counter for Adventures */}
                {isAdventuresSection && (
                  <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {currentImageIndex + 1} / {currentMemoryData.images.length}
                  </div>
                )}
              </div>

              {/* Image Indicators - Apenas para seções não-aventuras com múltiplas imagens */}
              {currentMemoryData.images.length > 1 && !isAdventuresSection && (
                <div className="flex justify-center gap-1 mt-2 flex-wrap">
                  {currentMemoryData.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? "bg-white scale-125" : "bg-white/50"
                      }`}
                      onClick={() => {
                        clearTimers()
                        setCurrentImageIndex(index)
                        setNextImageIndex(index)
                        startImageTimer()
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Página de Introdução Especial */}
          {isIntroSection && (
            <div className="w-full max-w-md mx-auto text-center">
              <div className="mb-8">
                <IconComponent className="h-16 w-16 text-white mx-auto mb-4 animate-pulse" />
                <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{currentMemoryData.title}</h1>
                <h2 className="text-xl text-white/90 mb-6">{currentMemoryData.subtitle}</h2>
                <p className="text-white/80 text-base leading-relaxed px-4 mb-8">{currentMemoryData.description}</p>
              </div>

              {/* Decoração especial para a introdução */}
              <div className="flex justify-center items-center gap-2 text-white/60 mb-8">
                <Heart className="h-4 w-4 animate-pulse" />
                <span className="text-sm">Toque para começar nossa jornada</span>
                <Heart className="h-4 w-4 animate-pulse" />
              </div>

              {/* Coração Interativo */}
              <div className="flex justify-center">
                <button
                  onClick={fillHeart}
                  disabled={isHeartFilling}
                  className="relative group focus:outline-none"
                  aria-label="Toque no coração para começar"
                >
                  <div className="relative">
                    {/* Coração de fundo (contorno) */}
                    <Heart
                      className="h-20 w-20 text-white stroke-2 fill-none transition-all duration-300 group-hover:scale-110"
                      strokeWidth={2}
                    />

                    {/* Coração preenchido (animado) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        clipPath: `inset(${100 - heartFillProgress}% 0 0 0)`,
                      }}
                    >
                      <Heart className="h-20 w-20 text-red-500 fill-red-500 transition-all duration-100" />
                    </div>

                    {/* Efeito de brilho quando preenchendo */}
                    {isHeartFilling && (
                      <div className="absolute inset-0 animate-pulse">
                        <Heart className="h-20 w-20 text-red-300 fill-red-300 opacity-50" />
                      </div>
                    )}
                  </div>

                  {/* Texto de instrução */}
                  <p className="text-white/70 text-xs mt-3 group-hover:text-white transition-colors">
                    {isHeartFilling ? "Preenchendo..." : "Toque aqui"}
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Página de Conclusão Especial */}
          {isConclusionSection && (
            <div className="w-full max-w-md mx-auto text-center">
              <div className="mb-8">
                <IconComponent
                  className="h-16 w-16 text-white mx-auto mb-4 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
                <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{currentMemoryData.title}</h1>
                <h2 className="text-xl text-white/90 mb-6">{currentMemoryData.subtitle}</h2>
                <p className="text-white/80 text-base leading-relaxed px-4 mb-8">{currentMemoryData.description}</p>
              </div>

              {/* Decoração especial para a conclusão */}
              <div className="flex justify-center items-center gap-2 text-white/60 mb-8">
                <Heart className="h-4 w-4 animate-pulse" />
                <span className="text-sm">Toque para recomeçar nossa jornada</span>
                <Heart className="h-4 w-4 animate-pulse" />
              </div>

              {/* Símbolo do Infinito Interativo */}
              <div className="flex justify-center">
                <button
                  onClick={fillInfinity}
                  disabled={isInfinityFilling}
                  className="relative group focus:outline-none"
                  aria-label="Toque no infinito para recomeçar"
                >
                  <div className="relative">
                    {/* Infinito de fundo (contorno) */}
                    <InfinityIcon
                      className="h-20 w-20 text-white stroke-2 fill-none transition-all duration-300 group-hover:scale-110"
                      strokeWidth={2}
                    />

                    {/* Infinito preenchido (animado) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        clipPath: `inset(0 ${100 - infinityFillProgress}% 0 0)`,
                      }}
                    >
                      <InfinityIcon className="h-20 w-20 text-purple-300 fill-purple-300 transition-all duration-100" />
                    </div>

                    {/* Efeito de brilho quando preenchendo */}
                    {isInfinityFilling && (
                      <div className="absolute inset-0 animate-pulse">
                        <InfinityIcon className="h-20 w-20 text-purple-200 fill-purple-200 opacity-50" />
                      </div>
                    )}
                  </div>

                  {/* Texto de instrução */}
                  <p className="text-white/70 text-xs mt-3 group-hover:text-white transition-colors">
                    {isInfinityFilling ? "Preenchendo..." : "Toque aqui"}
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Memory Text - Compacto mas legível (apenas para páginas que não são intro nem conclusão) */}
          {!isIntroSection && !isConclusionSection && (
            <Card className="w-full bg-white/95 backdrop-blur-sm shadow-xl">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <IconComponent className="h-5 w-5 text-pink-600" />
                  {!isFinalSection && <Calendar className="h-4 w-4 text-gray-600" />}
                </div>

                <h2 className="text-lg font-bold text-gray-800 mb-2 leading-tight">{titleWithDays}</h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-2">{currentMemoryData.subtitle}</p>

                {/* Botão para mostrar mensagem final */}
                {isFinalSection && !showFinalMessage && (
                  <button
                    onClick={handleShowFinalMessage}
                    className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-lg text-sm hover:bg-pink-600 transition-colors"
                  >
                    Ver mensagem especial ❤️
                  </button>
                )}

                {isFinalSection && showFinalMessage && (
                  <div className="mt-2 p-3 bg-pink-50 rounded-lg border border-pink-200 max-h-[20vh] overflow-y-auto">
                    <p className="text-gray-700 text-sm leading-relaxed">{currentMemoryData.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Memory Navigation - Compacto */}
          <div className="flex justify-center gap-1 mt-1 flex-wrap">
            {memories.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentMemory ? "bg-white scale-125 shadow-lg" : "bg-white/50"
                }`}
                onClick={() => {
                  clearTimers()
                  setCurrentMemory(index)
                  setCurrentImageIndex(0)
                  setNextImageIndex(0)
                  setShowFinalMessage(false)
                  setHeartFillProgress(0)
                  setIsHeartFilling(false)
                  setInfinityFillProgress(0)
                  setIsInfinityFilling(false)
                  setImageProgress(0)
                }}
              />
            ))}
          </div>

          {/* Section Title - Compacto */}
          <div className="text-center">
            <p className="text-white text-xs font-medium opacity-80">
              {currentMemory + 1} de {memories.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}