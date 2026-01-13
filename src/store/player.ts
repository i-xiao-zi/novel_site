import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import type { Audio, Book, Chapter } from '@/types';
import type { RootState } from '.';
import Model from '@/database';

export interface PlayerState {
    loading: boolean;
    tool_visible: boolean;
    status: boolean;
    cover?: any;
    catalog: Chapter[];
    current?: Chapter;
    audio?: Audio;
    duration: number;
    drag_time?: number;
    time: number;
    volume: number;
    rate: number;
}

const initialState: PlayerState = {
    loading: false,
    tool_visible: false,
    status: false,
    catalog: [],
    duration: 0,
    time: 0,
    volume: 80,
    rate: 1.0,
};
const audio = async (cover_id: number, chapter_id: number) => {
    let subtitle = [];
    let audio = '';
    const subtitle_exists = await Model.storage.exists(`${cover_id}/${chapter_id}.json`);
    if (subtitle_exists.data) {
        const subtitle_result = await Model.storage.download(`${cover_id}/${chapter_id}.json`);
        console.log({subtitle_result: await subtitle_result.data.text()})
        subtitle = JSON.parse(await subtitle_result.data.text());
    }
    const audio_exists = await Model.storage.exists(`${cover_id}/${chapter_id}.mp3`);
    if (audio_exists.data) {
        const audio_result = await Model.storage.getPublicUrl(`${cover_id}/${chapter_id}.mp3`);
        audio = audio_result.data.publicUrl;
    }
    return {subtitle, audio}
}

const metadata = (title: string, artist: string, album: string, artwork: string) => {
    navigator.mediaSession.metadata = new MediaMetadata({title, artist, album, artwork: [{ src: artwork }] });
}

export const start = createAsyncThunk('start', async (payload: {cover: Book, chapter: Chapter, catalog: any[], position: string}, {getState}) => {
    const state = (getState() as RootState).player;
    return {
        ...payload,
        audio: await audio(state.cover.id, state.current.id)
    }
})

export const prev = createAsyncThunk('prev', async (_, {getState}) => {
    const state = (getState() as RootState).player;
    const article = state.catalog.filter(item => item.id < state.current.id)[0];
    return {
        article,
        audio: await audio(state.cover.id, article.id)
    }
})
export const next = createAsyncThunk('next', async (_, {getState}) => {
    const state = (getState() as RootState).player;
    const article = state.catalog.filter(item => item.id > state.current.id)[0];
    return {
        article,
        audio: await audio(state.cover.id, article.id)
    }
})
export const player = createSlice({
    name: 'player',
    initialState,
    reducers: {
        close: (state, _: PayloadAction<undefined>) => {
            console.log('close')
            state.tool_visible = false;
        },
        play: (state, _: PayloadAction<undefined>) => {
            state.status = true;
        },
        pause: (state, _: PayloadAction<undefined>) => {
            state.status = false;
        },
        setTime: (state, {payload}: PayloadAction<number>) => {
            state.time = payload * 10000000
        },
        setDragTime: (state, {payload}: PayloadAction<number>) => {
            state.drag_time = payload * 10000000
        },
        setDuration: (state, {payload}: PayloadAction<number>) => {
            state.duration = payload * 10000000
        },
        setRate: (state, {payload}: PayloadAction<number>) => {
            state.rate = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(start.pending, (state, _) => {
            state.loading = true;
        }).addCase(start.fulfilled, (state, action) => {
            state.status = true;
            state.cover = action.payload.cover;
            state.catalog = action.payload.catalog;
            state.current = action.payload.chapter;
            state.audio = action.payload.audio;
            state.status = true;
            metadata(state.current?.title, state.cover?.author, state.cover?.title, state.cover?.image);
        }).addCase(start.rejected, (state, _) => {
            state.loading = false
        })
        builder.addCase(prev.pending, (state, _) => {
            state.loading = true;
        }).addCase(prev.fulfilled, (state, action) => {
            state.status = true;
            state.current = action.payload.article;
            state.audio = action.payload.audio;
            metadata(state.current?.title, state.cover?.author, state.cover?.title, state.cover?.image);
        }).addCase(prev.rejected, (state, _) => {
            state.loading = false
        })
        builder.addCase(next.pending, (state, _) => {
            state.loading = true;
        }).addCase(next.fulfilled, (state, action) => {
            state.status = true;
            state.current = action.payload.article;
            state.audio = action.payload.audio;
            metadata(state.current?.title, state.cover?.author, state.cover?.title, state.cover?.image);
        }).addCase(next.rejected, (state, _) => {
            state.loading = false
        })
    }
});

export const { close, play, pause, setTime, setDragTime, setDuration, setRate } = player.actions;

export default persistReducer({
  key: 'player',
  storage,
  blacklist: [],
}, player.reducer);