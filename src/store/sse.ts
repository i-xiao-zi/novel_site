import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {type WritableDraft} from 'immer';

export interface SseState {
    window: string;
    cover: any[];
}

const initialState: SseState = {
    window: '',
    cover: [],
};

export const sse = createSlice({
    name: 'sse',
    initialState,
    reducers: {
        setWindow: (state: WritableDraft<SseState>, {payload}: PayloadAction<string>) => {
            state.window = payload
        },
        fetchSearch(state: WritableDraft<SseState>, {payload}: PayloadAction<string>) {
            const es = new EventSource(`/api/search?keyword=${payload}`)
            es.addEventListener('search', (event) => {
                console.log(event, [...JSON.parse(event.data)])
                // state.cover = [...JSON.parse(event.data)]
                state.cover = ['1', '2']
            })
            es.addEventListener('error', (event) => {
                console.log('收到错误:', event);
            })
            es.addEventListener('close', (event) => {
                console.log('连接已关闭', event);
            })
            es.onerror = (err) => {
                throw err
            }
            es.onopen = (event) => {
                console.log('连接已建立', event);
            }
            state.window = payload
        },
        fetchCover: (state: WritableDraft<SseState>, {payload}: PayloadAction<string>) => {
            const es = new EventSource(`/api/cover?url=${payload}`)
            es.onmessage = (event) => {
                state.cover = [...state.cover, event.data]
            }
            es.onerror = (err) => {
                throw err
            }
            es.onopen = (event) => {
                state.cover = []
            }
        },
    },
});

export const {setWindow, fetchSearch, fetchCover} = sse.actions;

export default sse.reducer;
