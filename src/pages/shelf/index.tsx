import React from 'react';
import { useNavigate } from 'react-router';
import { Box, CardActionArea, CardMedia } from '@mui/material';
import type { Book } from '@/models';
import { BookModel } from '@/database';
import Header from '../header';
import Footer from '../footer';
import ShelfIndexSkeleton from '../skeleton/shelf_index';
import { fetchBook } from '@/store/book';
import { useDispatch } from '@/store';

const Shelf: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = React.useState(false);
  const [books, setBooks] = React.useState<Book[]>([]);
  React.useEffect(() => {
    setLoading(true)
    BookModel.all().then(setBooks).finally(() => setLoading(false))
  }, []);
  const onClick = (id: number) => {
    dispatch(fetchBook(id));
    navigate(`/shelf/cover`)
  }
  return (
    <>
      <Header title="书架" />
      <main className='p-2'>
        <ShelfIndexSkeleton visible={loading} />
        <Box className='grid grid-cols-4 gap-2'>
          {books.map((book, index) => (
            <Box key={index}>
              <CardActionArea 
                className='bg-amber-500! rounded-md! overflow-hidden!' 
                onClick={() => onClick(book.id)} 
                data-active="true"
              >
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
