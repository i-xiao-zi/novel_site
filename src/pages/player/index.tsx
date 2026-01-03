import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

const Player: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <header>
        <KeyboardArrowDownOutlined
          className='text-4xl!'
          onClick={(e) => navigate(-1)}
        />
      </header>
      <main>

      </main>
      <footer>
        player
      </footer>
    </Container>
  )
}

export default Player
