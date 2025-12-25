import React from 'react';
import { HashRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from '@mui/material';
import Home from './pages/home';
import HomeSearch from './pages/home/search';
import Setting from './pages/setting';
import Shelf from './pages/shelf';
import Spider from './pages/spider';
import SpiderAdd from './pages/spider/add';
import Reader from './pages/reader';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/home/search" element={<HomeSearch />} />
          </Route>
          <Route path="/shelf" element={<Shelf />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/spider">
            <Route index element={<Spider />} />
            <Route path="/spider/add" element={<SpiderAdd />} />
          </Route>
          <Route path="/reader" element={<Reader />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
