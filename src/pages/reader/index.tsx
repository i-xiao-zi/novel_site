import React from 'react';
import { Button } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import Footer from '../footer';

const Reader: React.FC = () => {
  return (
    <>
      <main>
        <nav>
          <div><SearchOutlined />千里之外</div>
        </nav>
        <Button variant="outlined">Text</Button>
      </main>
      <Footer />
    </>
  )
}

export default Reader
