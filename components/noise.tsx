import { useEffect, useRef, useState } from 'react'
import { Noise } from '../util/appcontext'

const NoiseComponent: any = (props: any) => {
  const { noise, playSong } = props
  const audioRef = useRef<any>(null)

  const [volume, setVolume] = useState(100)

  const loopFn = () => {
    let duration = Math.ceil(audioRef?.current?.duration * 100)
    console.log(duration)
    //timeout before playing the track again
    let timeout = Math.floor(Math.random() * 10 * duration) + 5 * duration
    //start playing after timeout
    setTimeout(() => {
      audioRef.current?.play()
    }, timeout)
  }

  const volumeCtrl = (volume: number) => {
    if (volume <= 1 && volume >= 0) {
      setVolume(Math.floor(volume * 100))
      audioRef.current.volume = volume
    }
  }
  useEffect(() => {
    //for bg noise dont add event
    if (audioRef && audioRef.current) {
      if (noise.src.includes('background')) {
        volumeCtrl(0.4)
      } else {
        volumeCtrl(0.5)
      }
      if (noise.isPlaying && !noise.src.includes('background'))
        audioRef.current.addEventListener('ended', loopFn)
    }
  }, [])

  return (
    <div className="flex flex-col">
      <div
      className='flex items-center text-sm'
        onClick={() => {
          playSong(noise)
        }}
      >
      {noise.icon}  {noise.name} ({noise.type}) {noise.isPlaying ? '🔊' : ''}
      </div>
      {noise.isPlaying && (
        <div>
          <audio
            ref={audioRef}
            src={noise.src}
            autoPlay
            loop={noise.src.includes('background')} //background noise needn't worry about delay for looping
          />
          <div className="flex">
            <button
              className="w-24 bg-gray-100 p-2"
              onClick={() => volumeCtrl(audioRef?.current?.volume + 0.01)}
            >
              +
            </button>
            <span className="w-24 p-2">{volume}</span>
            <button
              className="w-24 bg-gray-100 p-2"
              onClick={() => volumeCtrl(audioRef?.current?.volume - 0.01)}
            >
              -
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoiseComponent
