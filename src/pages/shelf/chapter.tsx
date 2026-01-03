import React from 'react';
import Header from '../header';
import { useNavigate, useParams } from 'react-router';
import type { ChapterSpider } from '@/models';
import { AutoModeOutlined, Brightness7Outlined, ChevronLeftOutlined, CloseOutlined, PauseCircleOutlined, RadarOutlined } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import { ChapterModel } from '@/database';

const ShelfChapter: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [chapter, setChapter] = React.useState<ChapterSpider>();

    React.useEffect(() => {
      ChapterModel.find(Number(id)).then((res) => setChapter(res))
    }, [id])
  return (
    <Container>
      <Header left={<ChevronLeftOutlined onClick={() => navigate(-1)} />} />
      <main>
        <h1 className='text-center text-2xl font-bold mb-5'>{chapter?.title}</h1>
        <div className='' dangerouslySetInnerHTML={{ __html: chapter?.content }} />
      </main>
    </Container>
  )
}

export default ShelfChapter
