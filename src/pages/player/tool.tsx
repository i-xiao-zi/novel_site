import React from 'react';
import Draggable from 'react-draggable';
import { Stack } from '@mui/material';
import { CloseOutlined, PauseCircleOutlined, RadarOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';


const PlayerTool: React.FC = () => {
  const navigate = useNavigate();
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
  }, []);
  return (
    <div className='absolute w-0 h-0'>
      <Draggable defaultPosition={{ x: 0, y: window.innerHeight - 150 }} nodeRef={ref} bounds={{
        top: 50,
        left: 0,
        right: window.innerWidth - (document.querySelector('.player_tool')?.clientWidth || 0),
        bottom: window.innerHeight- (document.querySelector('footer')?.clientHeight || 0),
      }}>
        <Stack ref={ref} className='inline-flex! player_tool items-center rounded-full p-0.5 bg-gray-300' direction="row">
          <RadarOutlined 
            className='animate-[spin_3s_linear_infinite] -m-2 text-5xl!' 
            onClick={(e) => navigate('/player')}
          />
          <PauseCircleOutlined  className='ml-2 text-4xl!' />
          <CloseOutlined
            className='ml-2 text-xl!'
            onClick={(e) => navigate('/player')}
          />
        </Stack>
      </Draggable>
    </div>
  )
}

export default PlayerTool
