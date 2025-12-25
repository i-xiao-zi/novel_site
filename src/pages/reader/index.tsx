import React from 'react';
import { Button } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import Layout from '../layout';

const Reader: React.FC = () => {
  return (
    <Layout>
      <main>
        <nav>
          <div><SearchOutlined />千里之外</div>
        </nav>
        <Button variant="outlined">Text</Button>
      </main>
    </Layout>
  )
}

export default Reader
