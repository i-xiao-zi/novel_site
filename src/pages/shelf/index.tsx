import React from 'react';
import Footer from '../footer';
import Header from '../header';
import { Box, CardActionArea, CardMedia, Grid, Skeleton } from '@mui/material';
import type { Book } from '@/models';
import { BookModel } from '@/database';
import { useNavigate } from 'react-router';

const Shelf: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(0);
  const [books, setBooks] = React.useState<Book[]>([]);
  React.useEffect(() => {
    setLoading(12)
    BookModel.all().then(res => {
      setBooks(res)
      setLoading(0)
    })
  }, [])
  return (
    <>
      <Header title="书架" />
      <main className='p-2'>
        <Box className='grid grid-cols-3 gap-2'>
          {
            Array(loading).fill(0).map((_, index) => (
                <Box key={index} className='px-5 py-2'>
                  <Skeleton component='div' className='w-24 h-32! rounded-md' variant="rectangular" />
                  <Skeleton className='w-24' variant="text" />
                </Box>
            ))
          }
        </Box>
        <Box className='grid grid-cols-4 gap-2'>
          {books.map((book, index) => (
            <Box key={index}>
              <CardActionArea className='bg-amber-500! rounded-md! overflow-hidden!' onClick={() => { navigate(`/shelf/cover/${book.id}`) }} data-active="true">
                <CardMedia
                  sx={{ height: 140 }}
                  image={book?.image}
                  title="green iguana"
                />
              </CardActionArea>
              <div className='text-center'>{book?.name}</div>
            </Box>
          ))}
        </Box>
      </main>
      <Footer />
    </>
  )
}

export default Shelf
