import React from 'react'
import { Container } from '@mui/material';
import PlayerTool from './player/tool';
import { Outlet } from 'react-router';

const Layout: React.FC = () => {
  return (
    <Container className='flex flex-col h-screen'>
      <Outlet />
      <PlayerTool />
    </Container>
  )
}

export default Layout
