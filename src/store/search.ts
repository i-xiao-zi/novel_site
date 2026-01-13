import axios from '@/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface SearchState {
    keywords: string;
    history: string[];
    items: any[];
    loading: boolean;
}

const initialState: SearchState = {
    keywords: '',
    history: [],
    items: [],
    loading: false,
};

export const searchKeywords = createAsyncThunk('searchKeywords', async (keywords: string) => {
  const res = await axios.get<any[]>(`/spider/search?keywords=${keywords}`)
  return res.code ===0 ? res.data : []
})

export const search = createSlice({
    name: 'search',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(searchKeywords.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(searchKeywords.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        builder.addCase(searchKeywords.rejected, (state, _) => {
            state.loading = false
            state.items = []
        })
    }
});

export const {} = search.actions;

export default search.reducer;
