import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { IconButton, List, ListItem, ListItemButton, ListItemText, Switch, useColorScheme } from '@mui/material';
import { ArrowRightOutlined, DarkMode, LightMode } from '@mui/icons-material';

const Setting: React.FC = () => {
  const {mode, setMode} = useColorScheme();
  return (
    <>
      <Header title="设置" />
      <main>
        <List>
          <ListItem 
            className='bg-gray-200 my-1'
            secondaryAction={ <IconButton edge="end" aria-label="comments">
                <Switch
                  checked={mode === 'dark'}
                  onChange={(_, checked) => setMode(checked ? 'dark' : 'light')}
                  slots={ { thumb: ({className, ownerState}) => {
                    return ownerState.checked ? 
                      <DarkMode className={`${className} bg-gray-300 rounded-full`} color={ownerState.color} fontSize={ownerState.fontSize} /> : 
                      <LightMode className={`${className} bg-gray-300 rounded-full`} color={ownerState.color} fontSize={ownerState.fontSize} />
                  } }}
                />
              </IconButton> }
            disablePadding>
            <ListItemText primary="主题" />
          </ListItem>
          <ListItem
            className='bg-gray-200 my-1'
            secondaryAction={ <ArrowRightOutlined /> }
            disablePadding>
            <ListItemButton>
              <ListItemText primary="音量" />
            </ListItemButton>
          </ListItem>
        </List>
      </main>
      <Footer />
    </>
  )
}

export default Setting
