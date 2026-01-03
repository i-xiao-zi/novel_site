import React from 'react'
import Header from '@/pages/header'
import { ChevronLeftOutlined, SearchOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from '@/axios';
import { Box, Chip, List, ListItem, ListItemButton, Skeleton } from '@mui/material';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = React.useState(0);
  const [items, setItems] = React.useState<any[]>([]);
 
  const handleSearch = (v: string) => {
    if (v.trim() === '') {
      return;
    }
    setLoading(3);
    axios.get(`/spider/search?keywords=${v}`).then((res) => {
      setItems(res.data.data)
      setLoading(0);
    })
  }
  return (
    <>
      <Header 
        left={<ChevronLeftOutlined onClick={() => navigate(-1)} />}
        title = {<div className='flex-auto flex items-center self-center rounded-md bg-gray-200'>
          <SearchOutlined />
          <input 
            className='w-full text-sm focus:outline-none py-1' 
            value={value} 
            onChange={(e) => setValue(e.target.value.trim())} 
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(value)}
            placeholder="搜索"
          />
        </div>}
        right={<span className='text-sm'>搜索</span>}
        onLeft={() => navigate(-1)}
        onRight={() => handleSearch(value)}
      />
      <main className=''>
        <Chip
          label="万古"
          onClick={() => handleSearch('万古')}
          onDelete={() => handleSearch('万古')}
        />
        {
          Array(loading).fill(0).map((_, index) => (
            <Box key={index} className='flex px-5 py-2'>
              <Skeleton component='div' className='w-24 h-32!' variant="rectangular" />
              <div className='flex-auto flex flex-col pl-2'>
                <Skeleton variant="text" />
                <Skeleton className='w-1/2' variant="text" />
                <Skeleton className='w-1/2' variant="text" />
                <Skeleton className='w-full flex-auto' variant="rounded" />
              </div>
            </Box>
          ))
        }
        
        <List>
        {items.map((item, index) => (
          <ListItem key={index} onClick={() => {}} disablePadding>
            <ListItemButton onClick={() => navigate(`/home/cover?url=${item.url}`)}>
              <img className='w-24 h-32' src="https://mui.com/static/images/cards/live-from-space.jpg" />
              <div className='ml-2 flex-auto self-stretch flex flex-col justify-items-start'>
                <div className='text-sm'>{item.title}</div>
                <div className='text-xs text-gray-500'>{item.author}</div>
                <div className='text-xs text-gray-500'>{item.category}</div>
              </div>
            </ListItemButton>
          </ListItem>
        ))}
        </List>
      </main>
    </>
  )
}

export default Search
