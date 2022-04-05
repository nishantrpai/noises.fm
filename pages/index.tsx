import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import NoiseComponent from '../components/noise'
import AudioContext, { Noise } from '../util/appcontext'

const Home: NextPage = () => {
  const { state, playFn, playSong } = useContext(AudioContext)
  const { noises, functions, currentTheme } = state
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col justify-center px-20">
        {/** items center */}
        {functions.map((fn) => (
          <a
            onClick={() => playFn(fn.name)}
            className={`${
              currentTheme == fn.name ? 'text-blue-800' : 'text-black'
            }`}
          >
            {fn.name}
          </a>
        ))}
        <p className="mt-4 font-bold">Primary</p>
        {noises
          .filter((noise) => noise.src.includes('primary'))
          .map((noise: Noise) => (
            <div
              className={`${noise.isPlaying ? 'text-blue-600' : 'text-black'}`}
            >
              <span
                onClick={() => {
                  playSong(noise)
                }}
              >
                {noise.name} ({noise.type}) {noise.isPlaying ? '🔊' : ''}
              </span>
              {noise.isPlaying && <NoiseComponent {...noise} />}
            </div>
          ))}

        <p className="mt-4 font-bold">Background</p>
        {noises
          .filter((noise) => noise.src.includes('background'))
          .map((noise: Noise) => (
            <div
              className={`${noise.isPlaying ? 'text-blue-600' : 'text-black'}`}
            >
              <span
                onClick={() => {
                  playSong(noise)
                }}
              >
                {noise.name} ({noise.type}) {noise.isPlaying ? '🔊' : ''}
              </span>
              {noise.isPlaying && <NoiseComponent {...noise} />}
            </div>
          ))}
      </main>
    </div>
  )
}

export default Home
