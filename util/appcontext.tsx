import { createContext } from 'react'

export interface Noise {
  name: any
  src: any
  type: any
  icon: any
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
    currentState: any
  }
  playFn: (fn: string) => any
  playSong: (noise: Noise) => any
  setCurrentState: (state: boolean) => any
  clearPlaylist: () => any
}

const AudioContext = createContext({} as AudioContextState)

export default AudioContext
