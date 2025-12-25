import { AddOutlined } from '@mui/icons-material';
import { CardActionArea, CardContent, Typography } from '@mui/material';
import React from 'react';
import Layout from '../layout';

import { useNavigate } from 'react-router-dom'

const Spider: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Layout>
      <main>
        <CardActionArea className='bg-amber-500' onClick={() => {}} data-active="true">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              爬虫
            </Typography>
            <Typography variant="body2" color="text.secondary">
              从网络上抓取小说内容
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActionArea
          className='bg-amber-500!' 
          onClick={() => navigate('/spider/add')} 
          data-active="true"
        >
          <CardContent className='flex justify-center items-center h-22'>
            <AddOutlined />
          </CardContent>
        </CardActionArea>
      </main>
    </Layout>
  )
}

export default Spider
