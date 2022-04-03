import { useEffect, useRef, useState } from 'react'
import { Noise } from '../util/appcontext'

const NoiseComponent: any = (noise: Noise) => {
  const audioRef = useRef<any>(null)

  const [volume, setVolume] = useState(100)

  const loopFn = () => {
    let duration = Math.ceil(audioRef?.current?.duration * 1000)
    console.log(duration)
    //timeout before playing the track again
    let timeout = Math.floor(Math.random() * 10 * duration) + 5 * duration
    console.log(noise.name, timeout)
    //start playing after timeout
    setTimeout(() => {
      audioRef?.current?.play()
    }, timeout)
  }

  const volumeCtrl = (volume: number) => {
    if (volume <= 1 && volume >= 0) {
      setVolume(Math.floor(volume * 100))
      audioRef.current.volume = volume
    }
  }
  useEffect(() => {
    console.log('mount noise', noise.name)
    if (audioRef && audioRef.current) {
      if (noise.isPlaying) audioRef.current.addEventListener('ended', loopFn)
      else audioRef.current.removeEventListener('ended', loopFn)
    }
  }, [])

  return noise.isPlaying ? (
    <div className="flex">
      <audio ref={audioRef} src={noise.src} autoPlay />
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
  ) : null
}

export default NoiseComponent
