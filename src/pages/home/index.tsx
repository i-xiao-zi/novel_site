import React from 'react';
import { Button } from '@mui/material';
import Header from './header';
import Layout from '../layout';
import PlayerTool from '../player/tool';

const Home: React.FC = () => {
  return (
    <Layout>
      <Header />
      <main>
        <PlayerTool />
        <div><Button variant="outlined">Text</Button></div>
        <div><Button variant="outlined">Text</Button></div>
        <div><Button variant="outlined">Text</Button></div>
      </main>
    </Layout>
  )
}

export default Home
