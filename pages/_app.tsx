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
    isPlaying: false,
  },
  {
    name: 'cembalo2',
    src: '/audio/cembalo-10.wav',
    el: null,
    type: 'sleep',
    isPlaying: false,
  },
  {
    name: 'cembalo3',
    src: '/audio/cembalo-11.wav',
    el: null,
    type: 'work',
    isPlaying: false,
  },
  {
    name: 'cembalo4',
    src: '/audio/cembalo-12.wav',
    el: null,
    type: 'work',
    isPlaying: false,
  },
]

function MyApp({ Component, pageProps }: AppProps) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<any[]>([])
  const [currentTheme, setCurrentTheme] = useState<any>(null)

  const createAudioElement = (src: string) => {
    let el = document.createElement('audio')
    el.src = src
    return el
  }

  useEffect(() => {
    noises.map((noise) => {
      noise.el = createAudioElement(noise.src)
      return noise
    })
  }, [])

  useEffect(() => {
    console.log('playlist changed')
    // stop all songs currently being played
    console.log(currentlyPlaying)
  }, [currentlyPlaying])

  const playSong = (noise: Noise) => {
    let currentlyplayingcopy = [...currentlyPlaying]
    if (noise.isPlaying) {
      noise.isPlaying = false
      noise.el.volume = 0
      noise.el.pause()
      noise.el.remove()
      noise.el = null
      noise.el = createAudioElement(noise.src)
      noise.el.currentTime = 0

      if (currentlyplayingcopy.includes(noise)) {
        currentlyplayingcopy = currentlyplayingcopy.filter(
          (playing) => playing.name != noise.name
        )
      }
    } else {
      noise.isPlaying = true
      noise.el.play()
      noise.el.addEventListener('ended', () => {
        let duration = Math.ceil(noise.el.duration * 1000)
        console.log(duration)
        //timeout before playing the track again
        let timeout = Math.floor(Math.random() * 10 * duration) + 5 * duration
        console.log(timeout)
        setTimeout(() => {
          noise.el.play()
        }, timeout)
      })
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
    arr.forEach((noise: any) => (noise.isPlaying = true))
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
