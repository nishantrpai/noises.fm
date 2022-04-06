import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AudioContext, {
  Noise,
  AudioContextState,
  NoiseFunction,
} from '../util/appcontext'
import { useEffect, useState } from 'react'
import { BsCloudLightningRainFill, BsFillCloudRainFill, } from 'react-icons/bs'
import { FiWind} from 'react-icons/fi'
import { GiCampfire, GiHummingbird, GiForest} from 'react-icons/gi'
import { WiNightAltCloudy} from 'react-icons/wi'
import { FaFan, FaUmbrellaBeach} from 'react-icons/fa'

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
    icon: <BsCloudLightningRainFill/>,
    isPlaying: false,
  },
  {
    name: 'Light Rain',
    src: '/audio/background/nature/rain-falls-against-the-parasol.mp3',
    type: 'work',
    icon: <BsFillCloudRainFill/>,
    isPlaying: false,
  },
  {
    name: 'Pattaya Beach',
    src: '/audio/background/nature/pattaya-beach.mp3',
    type: 'work',
    icon: <FaUmbrellaBeach/>,
    isPlaying: false,
  },
  {
    name: 'Forest Summer',
    src: '/audio/background/nature/forest-summer.mp3',
    type: 'work',
    icon: <GiForest/>,
    isPlaying: false,
  },
  {
    name: 'Wind Blowing',
    src: '/audio/primary/wind-blow.mp3',
    type: 'sleep',
    icon: <FiWind/>,
    isPlaying: false,
  },
  {
    name: 'Camp Fire',
    src: '/audio/primary/camp-fire.mp3',
    type: 'work',
    icon: <GiCampfire/>,
    isPlaying: false,
  },
  {
    name: 'Birds Singing',
    src: '/audio/primary/birds-singing.mp3',
    type: 'work',
    icon: <GiHummingbird/>,
    isPlaying: false,
  },
  {
    name: 'Fan',
    src: '/audio/primary/fan-01.mp3',
    type: 'work',
    icon: <FaFan/>,
    isPlaying: false,
  },
  {
    name: 'Night',
    src: '/audio/primary/cicada-night.mp3',
    type: 'sleep',
    icon: <WiNightAltCloudy/>,
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
      let primaryarr: Noise[] = []
      let backgroundarr: Noise[] = []

      primaryarr = noises.filter(
        (noise) => noise.type == fn && noise.src.includes('primary')
      )
      backgroundarr = noises.filter(
        (noise) => noise.type == fn && noise.src.includes('background')
      )

      arr = [
        ...primaryarr.sort(() => Math.random() - Math.random()).slice(0, 3),
        ...backgroundarr.sort(() => Math.random() - Math.random()).slice(0, 1),
      ]

      setCurrentTheme(fn)
      playSongs(arr)
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
