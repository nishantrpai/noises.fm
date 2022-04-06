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

      <main className="flex	max-h-fit w-full max-w-xl flex-1 flex-col justify-center">
        {/** items center */}
        <div className="max-h-max">
          <h1 className="w-max border-b-2 border-slate-500 py-2 text-sm font-bold text-slate-400">
            Noises.fm
          </h1>
          <div>
            {/** player */}
            <p className="mt-4 mb-4 font-bold text-gray-500">Functions</p>
            <div className="grid grid-cols-4 gap-4">
              {functions.map((fn) => (
                <a
                  onClick={() => playFn(fn.name)}
                  className={`${
                    currentTheme == fn.name
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-900 text-gray-400'
                  } rounded-md p-4 text-sm`}
                >
                  {fn.name}
                </a>
              ))}
            </div>
            <p className="mt-4 font-bold text-gray-500">Primary</p>
            <div className="grid grid-cols-4 gap-4">
              {noises
                .filter((noise) => noise.src.includes('primary'))
                .map((noise: Noise) => (
                  <NoiseComponent noise={noise} playSong={playSong} />
                ))}
            </div>
            <p className="mt-4 font-bold text-gray-500">Background</p>
            <div className="grid grid-cols-4 gap-4">
              {noises
                .filter((noise) => noise.src.includes('background'))
                .map((noise: Noise) => (
                  <NoiseComponent noise={noise} playSong={playSong} />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
