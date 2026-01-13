import React from 'react';
import Header from '../header';
import axios from '@/axios';
import { useNavigate, useSearchParams } from 'react-router';
import type { ChapterSpider } from '@/models';
import { ChevronLeftOutlined, CloseOutlined, PauseCircleOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';

const HomeChapter: React.FC = () => {
  const navigate = useNavigate();
  const [params, _] = useSearchParams();
  const [chapter, setChapter] = React.useState<ChapterSpider>({
    content: '',
    title: '',
    url: '',
  });

    React.useEffect(() => {
      const url = params.get('url');
      axios.get(`/spider/chapter?url=${url}`).then((res) => setChapter(res.data as ChapterSpider))
    }, [params])
  return (
    <>
      <Header left={<ChevronLeftOutlined onClick={() => navigate(-1)} />} />
      <main>
        <Box className='fixed top-150 left-10'>
          <div className='flex items-center border rounded-full p-1 bg-gray-300'>
            <img src="" />
            <PauseCircleOutlined  className='ml-2 text-xl' />
            <CloseOutlined className='ml-2 text-sm' />
          </div>
        </Box>
        <h1 className='text-center text-2xl font-bold mb-5'>{chapter.title}</h1>
        <div className='' dangerouslySetInnerHTML={{ __html: chapter.content }} />
      </main>
    </>
  )
}

export default HomeChapter
