import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from '@mui/material';
import Home from '@/pages/home';
import HomeSearch from '@/pages/home/search';
import Setting from '@/pages/setting';
import Shelf from '@/pages/shelf';
import Spider from '@/pages/spider';
import SpiderAdd from '@/pages/spider/add';
import Reader from '@/pages/reader';
import theme from '@/theme';
import store from './store';
import HomeCover from './pages/home/cover';
import HomeChapter from './pages/home/chapter';
import VConsole from 'vconsole';
import SpiderInfo from './pages/spider/info';
import ShelfCover from './pages/shelf/cover';
import ShelfChapter from './pages/shelf/chapter';
import Player from './pages/player';
import Layout from './pages/layout';


const App: React.FC = () => {
  React.useEffect(() => {
    new VConsole();
  }, [])
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="/home/search" element={<HomeSearch />} />
                <Route path="/home/cover" element={<HomeCover />} />
                <Route path="/home/chapter" element={<HomeChapter />} />
              </Route>
              <Route path="/shelf">
                <Route index element={<Shelf />} />
                <Route path="/shelf/cover" element={<ShelfCover />} />
                <Route path="/shelf/chapter" element={<ShelfChapter />} />
              </Route>
              <Route path="/setting" element={<Setting />} />
              <Route path="/spider">
                <Route index element={<Spider />} />
                <Route path="/spider/add" element={<SpiderAdd />} />
                <Route path="/spider/:id" element={<SpiderInfo />} />
              </Route>
              <Route path="/reader" element={<Reader />} />
              <Route path="/player" element={<Player />} />
            </Route>
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App;
