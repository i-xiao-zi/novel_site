import React from 'react';
import { ChevronLeftOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, Input, InputLabel, Typography } from '@mui/material';
import Header from '../header';

const SpiderAdd: React.FC = () => {
  return (
    <>
      <Header
        left={<ChevronLeftOutlined />}
        title="添加爬虫"
        right={<Button>添加</Button>}
      />
      <main className='p-2'>
        <form>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              <Typography component="span">站点</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">名称</InputLabel>
                <Input name="name" />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">URL</InputLabel>
                <Input name="url" type="email" required />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">请求头</InputLabel>
                <Input name="headers" type="email" required />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">状态</InputLabel>
                <Input name="status" type="email" required />
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              <Typography component="span">搜索</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">邮箱地址</InputLabel>
                <Input id="email" name="email" type="email" required />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">邮箱地址</InputLabel>
                <Input id="email" name="email" type="email" required />
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              <Typography component="span">封面</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">邮箱地址</InputLabel>
                <Input id="email" name="email" type="email" required />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">邮箱地址</InputLabel>
                <Input id="email" name="email" type="email" required />
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              <Typography component="span">分页</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">邮箱地址</InputLabel>
                <Input id="email" name="email" type="email" required />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">下一页</InputLabel>
                <Input id="email" name="email" type="email" required />
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              <Typography component="span">章节</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">标题</InputLabel>
                <Input id="email" name="email" type="email" required />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">内容</InputLabel>
                <Input id="email" name="email" type="email" required />
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </form>
      </main>
    </>
  )
}

export default SpiderAdd
