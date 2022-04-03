import { useEffect, useRef } from 'react'
import { Noise } from '../util/appcontext'

const NoiseComponent: any = (noise: Noise) => {
  const audioRef = useRef<any>(null)

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

  useEffect(() => {
    console.log('mount noise', noise.name)
    if (audioRef && audioRef.current) {
      if (noise.isPlaying) audioRef.current.addEventListener('ended', loopFn)
      else audioRef.current.removeEventListener('ended', loopFn)
    }
  }, [])

  return noise.isPlaying ? (
    <audio ref={audioRef} src={noise.src} autoPlay />
  ) : null
}

export default NoiseComponent
