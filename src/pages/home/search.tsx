import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftOutlined, SearchOutlined } from '@mui/icons-material'
import { Chip, List, ListItem, ListItemButton } from '@mui/material';
import { useDispatch, useSelector, type RootState } from '@/store';
import HomeSearchSkeleton from '@/pages/skeleton/home_search';
import { searchKeywords } from '@/store/search';
import Header from '@/pages/header';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const store = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
 
  const handleSearch = (v: string) => {
    if (v.trim() === '') {
      return;
    }
    dispatch(searchKeywords(v));
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
        <HomeSearchSkeleton visible={store.loading} />
        <List>
        {store.items.map((item, index) => (
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
