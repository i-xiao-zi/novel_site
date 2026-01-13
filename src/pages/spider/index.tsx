import React from 'react';
import { useNavigate } from 'react-router-dom'
import { AddOutlined } from '@mui/icons-material';
import { CardActionArea, CardContent, Divider, Typography } from '@mui/material';
import { SpiderModel } from '@/database';
import type { Spider as MSpidder } from '@/models';
import Footer from '../footer';
import Header from '../header';


const Spider: React.FC = () => {
  const navigate = useNavigate()
  const [spiders, setSpiders] = React.useState<MSpidder[]>([]);
  React.useEffect(() => {
    SpiderModel.all().then(setSpiders)
  }, [])
  return (
    <>
      <Header title="爬虫" />
      <main>
        {spiders.map((spider, index) => (
          <CardActionArea
            key={index}
            onClick={() => navigate(`/spider/${spider.id}`)} 
            data-active="true"
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {spider.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {spider.origin}
              </Typography>
            </CardContent>
          </CardActionArea>
        ))}
        <CardActionArea className='' onClick={() => {}} data-active="true">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              爬虫
            </Typography>
            <Typography variant="body2" color="text.secondary">
              从网络上抓取小说内容
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider/>
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
      <Footer />
    </>
  )
}

export default Spider
