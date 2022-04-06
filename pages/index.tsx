import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import NoiseComponent from '../components/noise'
import AudioContext, { Noise } from '../util/appcontext'

const Home: NextPage = () => {
  const { state, playFn, playSong } = useContext(AudioContext)
  const { noises, functions, currentTheme } = state
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-2">
      <Head>
        <title>noises.fm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col justify-center px-20">
        {/** items center */}
        <h1 className="text-sm font-bold w-max border-b-2 border-slate-400 text-slate-400">
          Noises.fm
        </h1>
        <p className="mt-4 font-bold text-gray-500">Functions</p>
        {functions.map((fn) => (
          <a
            onClick={() => playFn(fn.name)}
            className={`${
              currentTheme == fn.name ? 'text-white' : 'text-gray-400'
            } text-sm`}
          >
            {fn.name}
          </a>
        ))}
        <p className="mt-4 font-bold text-gray-500">Primary</p>
        {noises
          .filter((noise) => noise.src.includes('primary'))
          .map((noise: Noise) => (
            <div
              className={`${noise.isPlaying ? 'text-white' : 'text-gray-400'}`}
            >
              <NoiseComponent noise={noise} playSong={playSong} />
            </div>
          ))}

        <p className="mt-4 font-bold text-gray-500">Background</p>
        {noises
          .filter((noise) => noise.src.includes('background'))
          .map((noise: Noise) => (
            <div
              className={`${noise.isPlaying ? 'text-white' : 'text-gray-400'}`}
            >
              <NoiseComponent noise={noise} playSong={playSong} />
            </div>
          ))}
      </main>
    </div>
  )
}

export default Home
