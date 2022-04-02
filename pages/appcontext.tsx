import { createContext } from 'react'

export interface Noise {
  name: any
  src: any
}

export interface AudioContextState {
  state: {
    noises: Noise[]
  }
}

const AudioContext = createContext({} as AudioContextState)

export default AudioContext
