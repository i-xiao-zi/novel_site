import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, List, ListItem } from '@mui/material';
import { ChevronLeftOutlined } from '@mui/icons-material'
import { SpiderModel } from '@/database';
import type { Spider } from '@/models';
import Header from '../header';

const SpiderInfo: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [spider, setSpider] = React.useState<Spider>();
  console.log({id})
  React.useEffect(() => {
    SpiderModel.find(Number(id)).then(setSpider)
  }, [id])
  return (
    <>
      <Header
        left={<ChevronLeftOutlined />}
        onLeft={() => navigate(-1)}
        title="添加爬虫"
        right={<Button>修改</Button>}
      />
      <main className=' p-2'>
        <List className=''>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>名称:</label>
            <span>{spider?.name}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span className='ml-2'>{spider?.origin}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>搜索URL:</label>
            <span className='ml-2 text-8'>{spider?.search_url}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>搜索方式:</label>
            <span className='ml-2'>{spider?.search_method ? 'POST' : 'GET'}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_data}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_content_type}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_parent}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_url}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_title}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_title_regular}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_category}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_category_regular}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_author}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_author_regular}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_image}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_description}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_description_regular}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_category_regular}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_latest}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_latest_regular}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_latest_title}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_latest_title_regular}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_latest_url}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_status}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.search_cover_status_regular}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>封面标题:</label>
            <span>{spider?.cover_title}</span>
          </ListItem>
          <ListItem>
            <label className='w-20 text-right bg-gray-100'>域名:</label>
            <span>{spider?.cover_title_regular}</span>
          </ListItem>
        </List>
      </main>
    </>
  )
}

export default SpiderInfo
