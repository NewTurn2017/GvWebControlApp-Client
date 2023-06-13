import React, { useState } from 'react'
import styled from 'styled-components'

const VolumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const Slider = styled.input`
  width: 200px;
  margin: 30px;
`

function VolumeSlider() {
  const [volume, setVolume] = useState(0)

  const handleVolumeChange = (event) => {
    setVolume(event.target.value)
  }

  return (
    <VolumeContainer>
      <Slider
        type="range"
        min={-40}
        max={15}
        value={volume}
        onChange={handleVolumeChange}
      />
      <div>Volume: {volume} dB</div>
    </VolumeContainer>
  )
}

export default VolumeSlider
