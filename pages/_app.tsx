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

  const removeFrmPlaylist = (noise: Noise) => {
    noise.isPlaying = false
    noise.el.volume = 0
    noise.el.pause()
    noise.el.remove()
    noise.el = null
    noise.el = createAudioElement(noise.src)
    noise.el.currentTime = 0
  }

  const addToPlayList = (noise: Noise) => {
    noise.isPlaying = true
    noise.el.play()
    noise.el.addEventListener('ended', () => {
      let duration = Math.ceil(noise.el.duration * 1000)
      console.log(duration)
      //timeout before playing the track again
      let timeout = Math.floor(Math.random() * 10 * duration) + 5 * duration
      console.log(noise.name, timeout)
      setTimeout(() => {
        noise.el.play()
      }, timeout)
    })
  }

  const playSong = (noise: Noise) => {
    if (noise.isPlaying) {
      removeFrmPlaylist(noise)
    } else {
      addToPlayList(noise)
    }
    setCurrentTheme(null)
  }

  const playSongs = (arr: Noise[]) => {
    console.log(
      'playing',
      arr.map((noise: any) => noise.name)
    )

    noises.forEach((noise: Noise) => removeFrmPlaylist(noise))
    arr.forEach((noise: any) => addToPlayList(noise))
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
        state: { noises, functions, currentTheme },
        playFn,
        playSong,
      }}
    >
      <Component {...pageProps} />
    </AudioContext.Provider>
  )
}

export default MyApp
