import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AudioContext, {
  Noise,
  AudioContextState,
  NoiseFunction,
} from '../util/appcontext'
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
    name: 'Light Rain',
    src: '/audio/lightrain.wav',
    el: null,
    type: 'work',
    isPlaying: false,
  },
]

function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState<any>(null)
  const [currentPlaylist, setCurrentPlayList] = useState<Noise[]>([])

  useEffect(() => {
    console.log('app init')
  }, [])

  const removeFrmPlaylist = (noise: Noise) => {
    noise.isPlaying = false
    console.log('remove from playlist', noise.name)
    setCurrentPlayList(currentPlaylist.filter((n) => n.name !== noise.name))
  }

  const addToPlayList = (noise: Noise) => {
    noise.isPlaying = true
    setCurrentPlayList([...currentPlaylist, noise])
  }

  const playSong = (noise: Noise) => {
    if (noise.isPlaying) {
      removeFrmPlaylist(noise)
    } else {
      addToPlayList(noise)
    }
    setCurrentTheme(null)
  }

  const clearPlaylist = () => {
    noises.forEach((noise: Noise) => removeFrmPlaylist(noise))
    setCurrentPlayList([] as Noise[])
  }

  const playSongs = (arr: Noise[]) => {
    console.log(arr)
    // remove all current tracks
    clearPlaylist()
    // add new tracks
    arr.forEach((track: Noise) => addToPlayList(track))
    setCurrentPlayList(arr)
  }

  const playFn = (fn: any) => {
    let arr = []
    if (currentTheme == fn) {
      clearPlaylist()
      setCurrentTheme(null)
    } else {
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
  }

  return (
    <AudioContext.Provider
      value={{
        state: { noises, functions, currentTheme, currentPlaylist },
        playFn,
        playSong,
      }}
    >
      <Component {...pageProps} />
    </AudioContext.Provider>
  )
}

export default MyApp
