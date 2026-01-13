import React from 'react';
import { Button } from '@mui/material';
import Header from './header';
import Footer from '../footer';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main className='flex-auto'>
        <div><Button variant="outlined">Text</Button></div>
        <div><Button variant="outlined">Text</Button></div>
        <div><Button variant="outlined">Text</Button></div>
      </main>
      <Footer />
    </>
  )
}

export default Home
