import { ChevronLeftOutlined } from '@mui/icons-material'
import React from 'react'
import Header from '../header'
import { Button } from '@mui/material'

const SpiderAdd: React.FC = () => {
  return (
    <>
      <Header
        left={<ChevronLeftOutlined />}
        title="添加爬虫"
        right={<Button>添加</Button>}
      />
      <main>
        SpiderAdd
      </main>
    </>
  )
}

export default SpiderAdd
