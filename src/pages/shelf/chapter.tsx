import React from 'react';
import Header from '../header';
import { useNavigate } from 'react-router';
import { ChevronLeftOutlined } from '@mui/icons-material';
import PlayerBall from '../player/ball';
import { useDispatch, useSelector } from '@/store';
import { start } from '@/store/player';

const ShelfChapter: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.book);
  const [historyFlag, setHistoryFlag] = React.useState(false);
  const [futureFlag, setFutureFlag] = React.useState(false);

  React.useEffect(() => {
    const main = document.querySelector('main') as HTMLDivElement;
    main.onscroll = () => {
      const history = (document.querySelector('#history-content')  as HTMLDivElement || null)?.getClientRects()[0];
      setHistoryFlag(history.bottom < 0);
      const future = (document.querySelector('#future-title')  as HTMLDivElement || null)?.getClientRects()[0];
      setFutureFlag(future.top < 0);
      console.log('future.top', future.top < 0)
    }
    return () => {
      document.querySelector('main').onscroll = null;
    }
  }, [state.chapter]);
  React.useEffect(() => {
    console.log('historyFlag', historyFlag)
    historyFlag && console.log('到了最后章节')
    setTimeout(() => {
        console.log('⏱️ 延迟验证:', 'historyFlag', historyFlag);
      }, 1000);
  }, [historyFlag]);
  React.useEffect(() => {
    console.log('futureFlag', futureFlag)
    futureFlag &&console.log('到了未来章节')
    setTimeout(() => {
        console.log('⏱️ 延迟验证:', 'futureFlag', futureFlag);
      }, 1000);
  }, [futureFlag]);
  const onClick = () => {
    const history = (document.querySelector('#history-content')  as HTMLDivElement || null)?.getClientRects()[0];
    const future = (document.querySelector('#future-title')  as HTMLDivElement || null)?.getClientRects()[0];
    if (history && history.bottom >= window.innerHeight) {
      // console.log('到了历史章节')
    }else if (future && future.top <= window.innerHeight) {
      // console.log('到了未来章节')
    }
    dispatch(start({cover: state.cover, chapter: state.chapter, catalog: state.catalog, position: ''}))
    navigate('/player')
  }
  return (
    <>
      <Header left={<ChevronLeftOutlined onClick={() => navigate(-1)} />} title={state.chapter?.title} />
      <main className='flex-1 min-h-0 overflow-y-auto'>
        {state.history && (<article id='history'>
          <h1 id='history-title' className='text-center text-2xl font-bold mb-5'>{state.history.title}</h1>
          <div id='history-content' className='' dangerouslySetInnerHTML={{ __html: state.history.content }} />
        </article>)}
        {state.chapter && (<article id='chapter'>
          <h1 id='chapter-title' className='text-center text-2xl font-bold mb-5'>{state.chapter.title}</h1>
          <div id='chapter-content' className='' dangerouslySetInnerHTML={{ __html: state.chapter.content }} />
        </article>)}
        {state.future && (<article id='future'>
          <h1 id='future-title' className='text-center text-2xl font-bold mb-5'>{state.futures[0].title}</h1>
          <div id='future-content' className='' dangerouslySetInnerHTML={{ __html: state.futures[0].content }} />
        </article>)}
      </main>
      <footer>
        <PlayerBall onClick={onClick} />
      </footer> 
    </>
  )
}

export default ShelfChapter
