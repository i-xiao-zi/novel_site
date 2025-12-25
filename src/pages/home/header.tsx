import React from 'react'
import { SearchOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
 const navigate = useNavigate();

  return (
    <header className="h-13">
      <nav className="fixed top-0 left-0 right-0 p-2 z-9999 bg-gray-500">
        <div className="flex items-center bg-amber-500 p-1 rounded-md" onClick={() => navigate('/home/search')}>
          <SearchOutlined />
          千里之外
        </div>
      </nav>
    </header>
  )
}

export default Header
