import React from 'react';
import Header from '../header';
import { Card, Container, List, ListItemButton, Typography } from '@mui/material';
import type { Book, Chapter } from '@/models';
import { BookModel, ChapterModel } from '@/database';
import { useNavigate, useParams } from 'react-router';
import { ChevronLeftOutlined } from '@mui/icons-material';

const BookCover: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = React.useState<Book>()
  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  React.useEffect(() => {
    BookModel.find(Number(id)).then(setBook)
    ChapterModel.all(Number(id)).then(setChapters)
  }, [id])
  React.useEffect(() => {
  }, [id])
  return (
    <Container>
      <Header
        left={<ChevronLeftOutlined onClick={() => navigate(-1)} />}
        title="书架"
      />
      <main className=''>
        <Card className='bg-gray-500! rounded-none! overflow-hidden! flex' onClick={() => { }} data-active="true">
          <img className='h-48 w-32 my-5 mx-2 border-none' src={book?.image} />
          <div className='flex-auto self-stretch my-5 mx-2'>
            <h1>{book?.name}</h1>
            <div className='text-sm text-gray-400 my-1'>
              <p >作者：{book?.author}</p>
              <p>分类：{book?.category}</p>
              <p>状态：{book?.status}</p>
            </div>
            <p className='text-sm text-gray-400'>{book?.description}</p>
          </div>
        </Card>
        <List>
          {chapters.map((item, index) => (
            <ListItemButton className='bg-gray-100!' key={index} onClick={() => navigate(`/shelf/chapter/${item.id}`)}>
              <Typography>{item.title}</Typography>
            </ListItemButton>
          ))}
        </List>
      </main>
    </Container>
  )
}

export default BookCover
