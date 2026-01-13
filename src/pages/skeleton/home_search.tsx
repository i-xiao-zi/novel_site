import React from 'react'
import { Box, Skeleton, Stack } from '@mui/material';



const HomeSearchSkeleton: React.FC<{ visible: boolean }> = ({ visible = false }) => {
  return (
    <Stack>
    {
      visible && Array(5).fill(0).map((_, index) => (
        <Box key={index} className='flex px-5 py-2'>
          <Skeleton component='div' className='w-24 h-32!' variant="rectangular" />
          <div className='flex-auto flex flex-col pl-2'>
            <Skeleton variant="text" />
            <Skeleton className='w-1/2' variant="text" />
            <Skeleton className='w-1/2' variant="text" />
            <Skeleton className='w-full flex-auto' variant="rounded" />
          </div>
        </Box>
      ))
    }
    </Stack>
  )
}

export default HomeSearchSkeleton
