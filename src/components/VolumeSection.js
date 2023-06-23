import React from 'react'
import { Typography, Box } from '@mui/material'
import VolumeKnob from './VolumeKnob'

function VolumeSection({ clientCount }) {
  return (
    <Box>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Volume Section
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {Array.from({ length: clientCount }).map((_, i) => (
          <VolumeKnob key={i} clientIndex={i} />
        ))}
      </Box>
    </Box>
  )
}

export default VolumeSection
