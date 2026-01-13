import React from 'react';
import { Stack } from '@mui/material';
import { CloseOutlined, KeyboardArrowRightOutlined, PauseCircleOutlined, PlayCircleOutlined, SportsSoccerOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from '@/store';
import { close, play, next, pause, setDuration, setTime, prev } from '@/store/player';


const PlayerTool: React.FC = () => {
  const navigate = useNavigate();
  const ref = React.useRef<HTMLDivElement>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const state = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const onLoadedMetadata = (e: React.ChangeEvent<HTMLAudioElement>) => {
    dispatch(setDuration(e.target?.duration || 0));
    e.target.playbackRate = state.rate;
    state.status && e.target.play();
  }

  React.useEffect(() => {
    if (state.status) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [state.status]);
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = state.rate;
    }
  }, [state.rate]);
  React.useEffect(() => {
    if (audioRef.current && state.drag_time) {
      audioRef.current.currentTime = state.drag_time/10000000;
    }
  }, [state.drag_time]);
  React.useEffect(() => {
    navigator.mediaSession.setActionHandler('play', () => dispatch(play()));
    navigator.mediaSession.setActionHandler('pause', () => dispatch(pause()));
    navigator.mediaSession.setActionHandler('previoustrack', () => dispatch(prev()));
    navigator.mediaSession.setActionHandler('nexttrack', () => dispatch(next()));
  }, []);
  return (
    <div className='fixed bottom-20 left-0'>
      {state.audio?.audio && (<audio 
          ref={audioRef}
          className='cancel' 
          src={state.audio?.audio}
          onTimeUpdate={(e: React.ChangeEvent<HTMLAudioElement>) => dispatch(setTime(e.target?.currentTime || 0))}
          onEnded={() => dispatch(next())}
          onLoadedMetadata={onLoadedMetadata}
      />)}
      {!state.tool_visible && (
        <Stack ref={ref} className='inline-flex! player_tool items-center rounded-full p-0.5 bg-gray-300' direction="row">
          <SportsSoccerOutlined className={`${state.status && 'animate-[spin_3s_linear_infinite]'} cancel -m-2 text-5xl!`} onClick={() => navigate('/player')} />
          {state.status ? (
            <PauseCircleOutlined  className='cancel ml-2 text-4xl! cursor-pointer' onClick={() => dispatch(pause())} />
          ) : (
            <PlayCircleOutlined className='cancel ml-2 text-4xl! cursor-pointer'  onClick={() => dispatch(play())} />
          )}
          <KeyboardArrowRightOutlined className='cancel text-4xl! cursor-pointer' onClick={() => dispatch(next())} />
          <CloseOutlined className='cancel text-xl! cursor-pointer' onClick={() => dispatch(close())} />
        </Stack>
      )}
      
    </div>
  )
}

export default PlayerTool
