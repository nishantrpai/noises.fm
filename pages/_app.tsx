import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AudioContext, { Noise, AudioContextState } from './appcontext'

const noises: Noise[] = [
  {
    name: 'cembalo1',
    src: '/audio/cembalo-6.wav',
  },
  {
    name: 'cembalo2',
    src: '/audio/cembalo-10.wav',
  },
  {
    name: 'cembalo3',
    src: '/audio/cembalo-11.wav',
  },
  {
    name: 'cembalo4',
    src: '/audio/cembalo-12.wav',
  },
]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AudioContext.Provider value={{ state: { noises } }}>
      <Component {...pageProps} />
    </AudioContext.Provider>
  )
}

export default MyApp
