import { createContext } from 'react'

export interface Noise {
  name: any
  src: any
  type: any
  isPlaying: boolean
}

export interface NoiseFunction {
  name: any
}

export interface AudioContextState {
  state: {
    noises: Noise[]
    functions: NoiseFunction[]
    currentPlaylist: Noise[]
    currentTheme: any
  }
  playFn: (fn: string) => any
  playSong: (noise: Noise) => any
}

const AudioContext = createContext({} as AudioContextState)

export default AudioContext
