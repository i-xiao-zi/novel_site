import React from 'react';
import Footer from '../footer';
import Header from '../header';
import { CardActionArea, CardMedia, Grid } from '@mui/material';

const Setting: React.FC = () => {
  return (
    <>
      <Header title="书架" />
      <main>
        <Grid container spacing={2}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid size={3} key={index}>
              <CardActionArea className='bg-amber-500! rounded-md! overflow-hidden!' onClick={() => {}} data-active="true">
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://mui.com/static/images/cards/live-from-space.jpg"
                  title="green iguana"
                />
              </CardActionArea>
              <div className='text-center'>书架 {index + 1}</div>
            </Grid>
          ))}
        </Grid>
      </main>
      <Footer />
    </>
  )
}

export default Setting
