import React from 'react';
import { Button } from '@mui/material';
import Header from './header';
import Layout from '../layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <Header />
      <main>
        <div><Button variant="outlined">Text</Button></div>
        <div><Button variant="outlined">Text</Button></div>
        <div><Button variant="outlined">Text</Button></div>
      </main>
    </Layout>
  )
}

export default Home
