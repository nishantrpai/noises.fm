import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AudioContext, {
  Noise,
  AudioContextState,
  NoiseFunction,
} from './appcontext'
import { useEffect, useState } from 'react'

/**
 * Logic:
 *  Sleep: sombre music
 *  Work: wake music
 */
const functions: NoiseFunction[] = [
  {
    name: 'work',
  },
  {
    name: 'sleep',
  },
]

const noises: Noise[] = [
  {
    name: 'cembalo1',
    src: '/audio/cembalo-6.wav',
    el: null,
    type: 'sleep',
  },
  {
    name: 'cembalo2',
    src: '/audio/cembalo-10.wav',
    el: null,
    type: 'sleep',
  },
  {
    name: 'cembalo3',
    src: '/audio/cembalo-11.wav',
    el: null,
    type: 'work',
  },
  {
    name: 'cembalo4',
    src: '/audio/cembalo-12.wav',
    el: null,
    type: 'work',
  },
]

function MyApp({ Component, pageProps }: AppProps) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<any[]>([])
  const [currentTheme, setCurrentTheme] = useState<any>(null)

  useEffect(() => {
    noises.map((noise) => {
      let el = document.createElement('audio')
      el.src = noise.src
      noise.el = el
      return noise
    })
  }, [])

  useEffect(() => {
    console.log('playlist changed')
  }, [currentlyPlaying])

  const playSong = (noise: Noise) => {
    let currentlyplayingcopy = [...currentlyPlaying]
    if (currentlyplayingcopy.includes(noise)) {
      currentlyplayingcopy = currentlyplayingcopy.filter(
        (playing) => playing != noise
      )
    } else {
      currentlyplayingcopy.push(noise)
    }
    setCurrentTheme(null)
    setCurrentlyPlaying(currentlyplayingcopy)
  }

  const playSongs = (arr: Noise[]) => {
    console.log(
      'playing',
      arr.map((noise: any) => noise.name)
    )
    setCurrentlyPlaying(arr)
  }

  const playFn = (fn: any) => {
    let arr = []
    switch (fn) {
      case 'work':
        arr = noises.filter((noise) => noise.type == 'work')
        break
      case 'sleep':
        arr = noises.filter((noise) => noise.type == 'sleep')
        break
      default:
        arr = noises
        break
    }
    setCurrentTheme(fn)
    playSongs(arr.sort(() => Math.random() - Math.random()).slice(0, 3))
  }

  return (
    <AudioContext.Provider
      value={{
        state: { noises, functions, currentlyPlaying, currentTheme },
        playFn,
        playSong,
      }}
    >
      <Component {...pageProps} />
    </AudioContext.Provider>
  )
}

export default MyApp
