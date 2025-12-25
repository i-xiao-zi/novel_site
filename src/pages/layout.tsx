import React from 'react'
import Footer from './footer';

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  console.log(children)
  return (
    <>
      { children }
      <Footer />
    </>
  )
}

export default Layout
