import React from 'react';

interface LayoutProps {
  left?: React.ReactNode,
  title?: React.ReactNode,
  children?: React.ReactNode,
  right?: React.ReactNode,
  onLeft?: () => void,
  onRight?: () => void,
}


const Header: React.FC<LayoutProps> = ({left, title, children, right, onLeft, onRight}) => {

  return (
    <header className='h-10'>
      <nav className='flex justify-between items-center bg-amber-500 fixed top-0 left-0 right-0 h-10 z-9999'>
        {!children && <button className='w-10 self-stretch' onClick={onLeft}>{ left }</button>}
        {!children && <div className='flex-auto self-stretch text-center flex items-center justify-center'>{ title }</div>}
        {!children && <button className='w-10 self-stretch' onClick={onRight}>{ right }</button>}
        { children }
      </nav>
    </header>
  )
}

export default Header
