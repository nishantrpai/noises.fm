import { useEffect, useRef, useState } from 'react'
import { Noise } from '../util/appcontext'

const NoiseComponent: any = (props: any) => {
  const { noise, playSong } = props
  const audioRef = useRef<any>(null)

  const [volume, setVolume] = useState(100)

  const loopFn = () => {
    console.log('triggered')
    let duration = Math.ceil(audioRef?.current?.duration * 100)
    //timeout before playing the track again
    let timeout = Math.floor(Math.random() * 4 * duration) + 2 * duration
    //start playing after timeout
    setTimeout(() => {
      if (noise.isPlaying) {
        console.log('playing', noise.name)
        audioRef.current?.play()
      }
    }, timeout)
  }

  const volumeCtrl = (volume: number) => {
    if (volume <= 1 && volume >= 0) {
      setVolume(Math.floor(volume * 100))
      audioRef.current.volume = volume
    }
  }
  useEffect(() => {
    if (!noise.src.includes('background'))
      audioRef.current.addEventListener('ended', loopFn)
  }, [])

  useEffect(() => {
    //for bg noise dont add event
    if (audioRef && audioRef.current)
      if (noise.isPlaying) audioRef.current.play()
      else audioRef.current.pause()
  }, [noise.isPlaying])

  return (
    <div
      className={`flex flex-col py-2 ${
        noise.isPlaying ? 'text-white' : 'text-slate-400'
      }`}
    >
      <div
        className="flex flex-col items-center py-4"
        onClick={() => {
          playSong(noise)
        }}
      >
        <span className="text-4xl">{noise.icon}</span>
        <span>{noise.name}</span>
      </div>
      <input
        type="range"
        value={volume}
        min="0"
        max="100"
        onChange={(e) => volumeCtrl(parseInt(e.target.value) / 100)}
      />
      <audio
        ref={audioRef}
        src={noise.src}
        loop={noise.src.includes('background')} //background noise needn't worry about delay for looping
      />
    </div>
  )
}

export default NoiseComponent
