import React from 'react';
import { useNavigate } from 'react-router';
import { AudiotrackOutlined, ChevronLeftOutlined, DownloadOutlined } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Card, List, ListItemButton } from '@mui/material';
import { useDispatch, useSelector } from '@/store';
import { fetchChapter } from '@/store/book';
import Header from '../header';
import Footer from '../footer';

const ShelfCover: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.book);
  const onClick = (id: number) => {
    dispatch(fetchChapter(id));
    navigate(`/shelf/chapter`)
  }
  return (
    <>
      <Header
        left={<ChevronLeftOutlined onClick={() => navigate(-1)} />}
        title="书架"
      />
      <main className='flex-1 min-h-0 flex flex-col'>
        <Card className='bg-gray-500! rounded-none! overflow-hidden! flex' onClick={() => { }} data-active="true">
          <img className='h-48 w-32 my-5 mx-2 border-none' src={state.cover?.image} />
          <div className='flex-auto self-stretch my-5 mx-2'>
            <h1>{state.cover?.name}</h1>
            <div className='text-sm text-gray-400 my-1'>
              <p >作者：{state.cover?.author}</p>
              <p>分类：{state.cover?.category}</p>
              <p>状态：{state.cover?.status}</p>
            </div>
            <p className='text-sm text-gray-400'>{state.cover?.description}</p>
          </div>
        </Card>
        <List className='flex-1 min-h-px overflow-y-auto'>
          {state.catalog.map((item, index) => (
            <>
              <ListItemButton
                key={index} 
                className={`bg-gray-100! justify-between! ${item.readed ? ' text-green-500!' : ''}`}
                onClick={() => onClick(item.id)}
              >
                <span>{item.title}</span>
                {item.audio ? <AudiotrackOutlined /> : <></>}
              </ListItemButton>
            </>
          ))}
        </List>
      </main>
      <Footer>
        <BottomNavigation
            showLabels
          >
            <BottomNavigationAction className='flex-1!' onClick={() => navigate('/')} label="更新" icon={<DownloadOutlined />} />
            <BottomNavigationAction className='flex-2!' onClick={() => navigate('/shelf')} label="阅读" icon={<DownloadOutlined />} />
          </BottomNavigation>
      </Footer>
    </>
  )
}

export default ShelfCover
