import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { HomeOutlined, SettingsOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <footer className="h-16">
      <div className='fixed bottom-0 left-0 right-0'>
        {children ? children : (<BottomNavigation
            showLabels
            value={value}
            onChange={(_, v) => setValue(v)}
          >
            <BottomNavigationAction onClick={() => navigate('/')} label="首页" icon={<HomeOutlined />} />
            <BottomNavigationAction onClick={() => navigate('/shelf')} label="书架" icon={<FavoriteIcon />} />
            <BottomNavigationAction onClick={() => navigate('/spider')} label="爬虫" icon={<LocationOnIcon />} />
            <BottomNavigationAction onClick={() => navigate('/setting')} label="设置" icon={<SettingsOutlined />} />
          </BottomNavigation>
        )}
      </div>
      
    </footer>
  )
}

export default Footer
