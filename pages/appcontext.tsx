import { createContext } from 'react'

export interface Noise {
  name: any
  src: any
  el: any
  type: any
}

export interface NoiseFunction {
  name: any
  theme: any
}

export interface AudioContextState {
  state: {
    noises: Noise[]
    functions: NoiseFunction[]
    currentlyPlaying: Noise[]
  }
  playFn: (fn: string) => any,
  playSong: (noise: Noise) => any,
}

const AudioContext = createContext({} as AudioContextState)

export default AudioContext