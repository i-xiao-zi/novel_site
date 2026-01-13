import React from 'react'
import Header from '@/pages/header'
import { BookOnlineOutlined, ChevronLeftOutlined, DownloadOutlined } from '@mui/icons-material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from '@/axios'
import { Backdrop, BottomNavigation, BottomNavigationAction, Card, CircularProgress, List, ListItemButton, Typography } from '@mui/material'
import type { CatalogSpider, CoverSpider } from '@/models'
import Footer from '../footer'

const HomeCover: React.FC = () => {
  const navigate = useNavigate();
  const [params, _] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState('加载中...');
  const [cover, setCover] = React.useState<CoverSpider>({
    author: '',
    category: '',
    description: '',
    image: '',
    latest: '',
    latest_title: '',
    latest_url: '',
    status: '',
    title: '',
  });
  const [catalog, setCatalog] = React.useState<CatalogSpider[]>([]);
  const download = () => {
    const url = params.get('url');
    const es = new EventSource(`/api/spider/book?url=${url}`);
    es.onopen = () => {
      setLoading(true);
    }
    es.addEventListener('book', (event) => {
      setLoadingText(JSON.parse(event.data).title);
    })
    es.addEventListener('chapter', (event) => {
      setLoadingText(JSON.parse(event.data).title);
    })
    es.addEventListener('complete', (event) => {
      setLoadingText(event.data);
    })
    es.addEventListener('error', (event) => {
      console.log('complete', event);
    })
    es.onmessage = (event) => {
      console.log(event.data);
    }
    
  }
  React.useEffect(() => {
    const url = params.get('url');
    axios.get(`/spider/cover?url=${url}`).then((res) => setCover(res.data as CoverSpider))
    axios.get(`/spider/catalog?url=${url}`).then((res) => setCatalog(res.data as CatalogSpider[]))
  }, [params])
  return (
    <>
      <Header 
        left={<ChevronLeftOutlined onClick={() => navigate(-1)} />}
        title = {'封面'}
        onLeft={() => navigate(-1)}
      />
      <main>
        <Backdrop 
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          className='bg-black flex-col bg-opacity-50'
          open={loading}>
          <CircularProgress color="inherit" />
          <span className='text-white'>{loadingText}</span>
        </Backdrop>
        <Card className='bg-gray-500! rounded-none! overflow-hidden! flex' onClick={() => {}} data-active="true">
          <img className='h-48 w-32 my-5 mx-2 border-none' src={cover.image} />
          <div className='flex-auto self-stretch my-5 mx-2'>
            <h1>{cover.title}</h1>
            <div className='text-sm text-gray-400 my-1'>
              <p >作者：{cover.author}</p>
              <p>分类：{cover.category}</p>
              <p>状态：{cover.status}</p>
            </div>
            <p className='text-sm text-gray-400'>{cover.description}</p>
          </div>
        </Card>
        <List>
          {catalog.map((item, index) => (
            <ListItemButton className='bg-gray-100!' key={index} onClick={() => navigate(`/home/chapter?url=${item.url}`)}>
              <Typography>{item.title}</Typography>
            </ListItemButton>
          ))}
        </List>
      </main>
      <Footer>
        <BottomNavigation showLabels>
          <BottomNavigationAction onClick={download} label="下载" icon={<DownloadOutlined />} />
          <BottomNavigationAction onClick={() => navigate('/home/reader')} label="阅读" icon={<BookOnlineOutlined />} />
        </BottomNavigation>
      </Footer>
    </>
  )
}

export default HomeCover
