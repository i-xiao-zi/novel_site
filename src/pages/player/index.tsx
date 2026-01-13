import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from '@/store';
import { BottomNavigation, BottomNavigationAction, Box, Drawer, List, ListItemButton, Slider, Tab, Tabs } from '@mui/material';
import { Alarm, AudiotrackOutlined, KeyboardArrowDownOutlined, Menu, MenuBook, Pause, PlayArrow, SkipNext, SkipPrevious, Speed } from '@mui/icons-material';
import { next, pause, play, setRate, setDragTime, prev } from '@/store/player';
import { stringTime } from '@/utils';
import Footer from '../footer';

const Player: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const processRef =  React.useRef<HTMLInputElement>(null);
  const state = useSelector((state) => state.player);
  const [time, setTime] = React.useState(-1);
  const [speedDrawer, setSpeedDrawer] = React.useState(false);
  const [voiceDrawer, setVoiceDrawer] = React.useState(false);
  const [catelogDrawer, setCatelogDrawer] = React.useState(false);
  const [timerDrawer, setTimerDrawer] = React.useState(false);
  const [timerTab, setTimerTab] = React.useState(0);

  React.useEffect(() => {
    if (processRef.current) {
      processRef.current.value = state.time.toString()
    }
  }, [state.time])

  const turnToRead = () => {
    navigate('/shelf/chapter');
  }

  return (
    <>
      <header className='flex justify-between items-center'>
        <KeyboardArrowDownOutlined
          className='text-4xl!'
          onClick={() => navigate(-1)}
        />
        <h1>
          <span className='text-lg'>{state.cover?.name}</span> / <span className='text-sm'>{state.cover?.author}</span>
        </h1>
        <span className='w-1' />
      </header>
      <main className='flex-1 min-h-0 flex flex-col'>
        <section className='flex justify-center items-center my-10'>
          <img className='mx-auto min-w-32 h-84 rounded-lg object-cover' src={state.cover?.image} />
        </section>
        <section className='flex-auto'>
          <h1 className='font-bold'>{state.current?.title}</h1>
          <div>{state.audio?.subtitle?.filter(item => item.duration <= state.time && item.duration + item.offset >= state.time )[0]?.text}</div>
        </section>
        <section>
          <div className='flex items-center'>
            <span>{stringTime(state.time)}</span>
            <Slider
              className='flex-auto'
              ref={processRef}
              value={time > -1 ? time : state.time/10000000}
              max={state.duration/10000000}
              color="secondary"
              onChange={(_, value) => setTime(value)}
              onChangeCommitted={(_, value) => {setTime(-1); dispatch(setDragTime(value))}}
            />
            <span>{stringTime(state.duration)}</span>
          </div>
          <div className='text-2xl flex justify-center items-center'>
            <SkipPrevious className='cursor-pointer text-5xl!' onClick={() => dispatch(prev())} />
            {state.status ? (
              <Pause className='cursor-pointer text-5xl!' onClick={() => dispatch(pause())} />
            ) : (
              <PlayArrow className='cursor-pointer text-5xl!' onClick={() => dispatch(play())} />
            )}
            <SkipNext className='cursor-pointer text-5xl!' onClick={() => dispatch(next())} />
          </div>
        </section>
      </main>
      <Footer>
        {/** 目录 */}
        <Drawer
          anchor='bottom'
          open={catelogDrawer}
          onClose={() => setCatelogDrawer(false)}
        >
          <List className='h-[75vh] overflow-y-auto'>
          {state.catalog.map((item, index) => (
              <ListItemButton
                key={index} 
                className={`bg-gray-100! justify-between! ${item.readed ? ' text-green-500!' : ''}`}
                onClick={() => {}}
              >
                <span>{item.title}</span>
                {item.audio ? <AudiotrackOutlined /> : <></>}
              </ListItemButton>
          ))}
        </List>
        </Drawer>
        {/** 定时 */}
        <Drawer
          anchor='bottom'
          open={timerDrawer}
          onClose={() => setTimerDrawer(false)}
        >
          <Tabs value={timerTab} onChange={(_, value) => setTimerTab(value)} aria-label="basic tabs example">
            <Tab label="Item One" />
            <Tab label="Item Two" />
          </Tabs>
          <Box hidden={timerTab !== 0}>
            111111
          </Box>
          <Box hidden={timerTab !== 1}>
            222222222
          </Box>
        </Drawer>
        {/** 语速 */}
        <Drawer
          anchor='bottom'
          open={speedDrawer}
          onClose={() => setSpeedDrawer(false)}
        >
          <div className='flex justify-between items-center'>
            <div>
              <KeyboardArrowDownOutlined
                className='text-4xl!'
                onClick={() => setSpeedDrawer(false)}
              />
            </div>
            <div className='text-2xl'>
              语速
            </div>
            <div>
              <span>重置</span>
            </div>
          </div>
          <div className='mx-3'>
            <Slider
              defaultValue={state.rate}
              max={2.5}
              min={0.5}
              step={0.1}
              marks={[
                { value: 0.5, label: '0.5' },
                { value: 1.0, label: '1.0' },
                { value: 1.5, label: '1.5' },
                { value: 2.0, label: '2.0' },
                { value: 2.5, label: '2.5' },
                { value: 3.0, label: '3.0' },
              ]}
              onChange={(_, value) => dispatch(setRate(value))}
              valueLabelDisplay="auto"
              color="secondary"
            />
          </div>
        </Drawer>
        {/** 音色 */}
        <Drawer
          anchor='bottom'
          open={voiceDrawer}
          onClose={() => setVoiceDrawer(false)}
        >
          <div className='flex justify-between items-center'>
            <div>
              <KeyboardArrowDownOutlined className='text-4xl!' onClick={() => setVoiceDrawer(false)} />
            </div>
            <div className='text-2xl'>
              音色
            </div>
            <div>
              <span>重置</span>
            </div>
          </div>
          <div className='mx-3'>
          </div>
        </Drawer>
        <BottomNavigation showLabels>
          <BottomNavigationAction onClick={() => setCatelogDrawer(true)} label="目录" icon={<Menu />} />
          <BottomNavigationAction onClick={() => setTimerDrawer(true)} label="定时" icon={<Alarm />} />
          <BottomNavigationAction onClick={() => setSpeedDrawer(true)} label={state.rate} icon={<Speed />} />
          <BottomNavigationAction onClick={turnToRead} label="原文" icon={<MenuBook />} />
        </BottomNavigation>
      </Footer>
    </>
  )
}

export default Player
