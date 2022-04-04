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
 *  Sleep: heavy rain
 *  Work: light rain
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
    name: 'Heavy Rain',
    src: '/audio/background/nature/rain-strong-with-thunders.mp3',
    type: 'sleep',
    isPlaying: false,
  },
  {
    name: 'Light Rain',
    src: '/audio/background/nature/rain-falls-against-the-parasol.mp3',
    type: 'work',
    isPlaying: false,
  },
  {
    name: 'Pattaya Beach',
    src: '/audio/background/nature/pattaya-beach.mp3',
    type: 'work',
    isPlaying: false,
  },
  {
    name: 'Forest Summer',
    src: '/audio/background/nature/forest-summer.mp3',
    type: 'work',
    isPlaying: false,
  },
  {
    name: 'Escobar',
    src: '/audio/background/nature/escobar-diego-geo-fonias-arroyo.mp3',
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
