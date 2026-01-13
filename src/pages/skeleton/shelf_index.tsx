import React from 'react'
import { Box, Grid, Skeleton } from '@mui/material';



const ShelfIndexSkeleton: React.FC<{ visible: boolean }> = ({ visible = false }) => {
  return (
    <Grid className='grid grid-cols-4 gap-1'>
    { visible && Array(12).fill(0).map((_, index) => (
      <Box key={index} className=''>
        <Skeleton component='div' className='w-22 h-32! rounded-md' variant="rectangular" />
        <Skeleton className='w-22' variant="text" />
      </Box>
    ))}
    </Grid>
  )
}

export default ShelfIndexSkeleton
