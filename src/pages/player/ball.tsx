import React from 'react';
import { IconButton, Stack } from '@mui/material';
import { HeadphonesOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';


const PlayerBall: React.FC<{onClick?: () => void}> = ({onClick}) => {
  const navigate = useNavigate();

  const handleClick=() => {
    onClick?.();
    navigate('/player');
  }

  return (
    <div className='h-10'>
      <Stack className='fixed right-0 bottom-20 bg-red-300 rounded-full'>
        <IconButton className='w-10 h-10' onClick={handleClick}>
          <HeadphonesOutlined className='w-10 h-10' />
        </IconButton>
      </Stack>
    </div>
  )
}

export default PlayerBall
