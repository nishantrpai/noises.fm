import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import AudioContext from './appcontext'

const Home: NextPage = () => {
  const { state, playFn } = useContext(AudioContext)
  const { noises, functions } = state
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {functions.map((fn) => (
          <a onClick={() => playFn(fn.name)}>{fn.name}</a>
        ))}

        {noises.map((noise) => (
          <a
            onClick={() => {
              noise.el.play()
            }}
          >
            {noise.name}
          </a>
        ))}
      </main>
    </div>
  )
}

export default Home
