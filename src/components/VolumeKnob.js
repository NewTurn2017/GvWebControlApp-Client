import React, { useState } from 'react'
import { Typography, Box, Slider, Button } from '@mui/material'
import { alpha } from '@mui/system'

function VolumeKnob({ clientIndex }) {
  const [volume1, setVolume1] = useState(0)
  const [volume2, setVolume2] = useState(0)

  const handleVolumeChange1 = (event, newValue) => {
    setVolume1(newValue)
    console.log(`Client ${clientIndex + 1} - Volume 1: ${newValue}`)
  }

  const handleVolumeChange2 = (event, newValue) => {
    setVolume2(newValue)
    console.log(`Client ${clientIndex + 1} - Volume 2: ${newValue}`)
  }

  return (
    <Box sx={{ width: 200, mx: 'auto', my: 5 }}>
      <Typography
        id={`client-${clientIndex}-vol1`}
        gutterBottom
        color="text.primary"
      >
        Client {clientIndex + 1} - Volume 1
      </Typography>
      <Slider
        orientation="vertical"
        aria-labelledby={`${clientIndex}-vol1`}
        value={volume1}
        onChange={handleVolumeChange1}
        step={1}
        marks
        min={-40}
        max={15}
        valueLabelDisplay="auto"
        sx={{
          color: alpha('#fff', 0.8),
          '& .MuiSlider-thumb': {
            '&:hover, &.Mui-focusVisible': {
              boxShadow: '0px 0px 0px 8px rgba(255, 255, 255, 0.16)',
            },
            '&.Mui-active': {
              boxShadow: '0px 0px 0px 14px rgba(255, 255, 255, 0.16)',
            },
          },
        }}
      />
      <Button variant="contained" color="secondary">
        Mute
      </Button>
      <Typography id={`${clientIndex}-vol2`} gutterBottom color="text.primary">
        Client {clientIndex + 1} - Volume 2
      </Typography>
      <Slider
        orientation="vertical"
        aria-labelledby={`client-${clientIndex}-vol2`}
        value={volume2}
        onChange={handleVolumeChange2}
        step={1}
        marks
        min={-40}
        max={15}
        valueLabelDisplay="auto"
        sx={{
          color: alpha('#fff', 0.8),
          '& .MuiSlider-thumb': {
            '&:hover, &.Mui-focusVisible': {
              boxShadow: '0px 0px 0px 8px rgba(255, 255, 255, 0.16)',
            },
            '&.Mui-active': {
              boxShadow: '0px 0px 0px 14px rgba(255, 255, 255, 0.16)',
            },
          },
        }}
      />
      <Button variant="contained" color="secondary">
        Mute
      </Button>
    </Box>
  )
}

export default VolumeKnob
