import axios from '../axios';
import { BookModel, ChapterModel } from '@/database';
import type { Book, Chapter } from '@/models';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

export interface SearchState {
    loading: boolean;
    cover?: Book;
    catalog: Chapter[];
    chapter?: Chapter;
    history?: Chapter;
    future: Chapter;
}

const initialState: SearchState = {
    loading: false,
    cover: undefined,
    catalog: [],
    future: undefined,
    history: undefined,
    chapter: undefined
};

export const fetchBook = createAsyncThunk('fetchBook', async (id: string|number) => {
    if (typeof id === 'number') {
        return {
            cover: await BookModel.find(id) || {} as Book,
            catalog: await ChapterModel.catalog(id) || [] as Chapter[]
        }
    } else {
        const cover = await axios.get<Book>(`/spider/cover?url=${id}`);
        const catalog = await axios.get<Chapter[]>(`/spider/catalog?url=${id}`);
        return {
            cover: cover.data,
            catalog: catalog.data || []
        }
    }
});
export const fetchChapter = createAsyncThunk('fetchChapter', async (id: string|number, {dispatch, getState}) => {
    if (typeof id === 'number') {
        const chapter = await ChapterModel.find(id) || {} as Chapter;
        // 预读
        const state = (getState() as RootState).book;
        const futures = state.catalog.filter((item) => item.id > id)[0];
        futures[0] && dispatch(fetchFuture(futures[0].id));
        const history = state.catalog.filter((item) => item.id < id);
        history[history.length - 1] && dispatch(fetchHistory(history[history.length - 1].id));
        return chapter;
    } else {
        const chapter = await axios.get<Chapter>(`/spider/chapter?url=${id}`);
        if (chapter) {
            return chapter.data;
        }
    }
});
export const fetchFuture = createAsyncThunk('fetchFuture', async (id: string|number) => {
    if (typeof id === 'number') {
        return await ChapterModel.find(id) || {} as Chapter;
    } else {
        const chapter = await axios.get<Chapter>(`/spider/chapter?url=${id}`);
        if (chapter) {
            return chapter.data;
        }
    }
});
export const fetchHistory = createAsyncThunk('fetchHistory', async (id: string|number) => {
    if (typeof id === 'number') {
        return await ChapterModel.find(id) || {} as Chapter;
    } else {
        const chapter = await axios.get<Chapter>(`/spider/chapter?url=${id}`);
        if (chapter) {
            return chapter.data;
        }
    }
});

export const search = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setCover: (state, action: PayloadAction<Book>) => {
            state.cover = action.payload;
        },
        setCatalog: (state, action: PayloadAction<Chapter[]>) => {
            state.catalog = action.payload;
        },
        turnNext: (state, _) => {
            if (state.future) {
                state.history = state.chapter;
                state.chapter = state.future;
                // fetchFutures(state.chapter.id);
            }
        },
        turnBack: (state, _) => {
            state.chapter = state.history;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBook.pending, (state, _) => {
            state.loading = true;
        }).addCase(fetchBook.fulfilled, (state, action) => {
            state.loading = false;
            state.cover = action.payload.cover;
            state.catalog = action.payload.catalog;
        }).addCase(fetchBook.rejected, (state, _) => {
            state.loading = false
        })
        builder.addCase(fetchChapter.pending, (state, _) => {
            state.loading = true;
        }).addCase(fetchChapter.fulfilled, (state, action) => {
            state.loading = false;
            state.chapter = action.payload;
        }).addCase(fetchChapter.rejected, (state, _) => {
            state.loading = false
        })
        builder.addCase(fetchFuture.fulfilled, (state, action) => {
            state.futures = [...state.futures, action.payload].sort((a, b) => a.id - b.id);
        })
        builder.addCase(fetchHistory.fulfilled, (state, action) => {
            state.history = action.payload;
        })
    }
});

export const { setCover, setCatalog } = search.actions;

export default search.reducer;
