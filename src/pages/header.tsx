import React from 'react'

interface LayoutProps {
  left?: React.ReactNode,
  title?: React.ReactNode,
  children?: React.ReactNode,
  right?: React.ReactNode,
}

const Header: React.FC<LayoutProps> = ({left, title, children, right}) => {
  return (
    <header className='bg-amber-500 h-10'>
      <nav className='flex justify-between items-center fiexd top-0 left-0 right-0 h-10 z-9999'>
        {!children && <div className='w-12'>{ left }</div>}
        {!children && <div className='flex-auto self-auto text-center'>{ title }</div>}
        {!children && <div className='w-12'>{ right }</div>}
        { children }
      </nav>
    </header>
  )
}

export default Header
