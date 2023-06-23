import { useEffect, useRef, useState } from 'react'
import { Typography, Button } from '@mui/material'
import { WEQ8Runtime } from 'weq8'
import 'weq8/ui'

function EQSection() {
  const weq8Ref = useRef(null)
  const [source, setSource] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const audioSource = audioCtx.createBufferSource()
    const destination = audioCtx.destination

    fetch('/test.mp3') // public 폴더에 있는 mp3 파일의 경로를 지정합니다.
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        audioSource.buffer = audioBuffer
        let weq8 = new WEQ8Runtime(audioCtx)
        audioSource.connect(weq8.input)
        weq8.connect(destination)

        if (weq8Ref.current) {
          weq8Ref.current.runtime = weq8
        }

        setSource(audioSource)
      })
      .catch((error) => {
        console.error('Error decoding audio data:', error)
      })

    return () => {
      if (audioSource) {
        audioSource.disconnect()
      }
    }
  }, []) // 의존성 배열이 비어 있음

  const handlePlay = () => {
    if (source) {
      source.start()
      setIsPlaying(true)
    }
  }

  const handleStop = () => {
    if (source) {
      source.stop()
      setIsPlaying(false)
    }
  }

  return (
    <div>
      <Typography variant="h4" color="text.primary">
        PEQ Section
      </Typography>
      <weq8-ui ref={weq8Ref} />
      <Button
        variant="contained"
        color="primary"
        onClick={isPlaying ? handleStop : handlePlay}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </Button>
    </div>
  )
}

export default EQSection
