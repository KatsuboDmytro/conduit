import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface FeedSliceState {
  selectedTag: string | null;
}

const initialState: FeedSliceState = {
  selectedTag: null,
}

export const feedSlice = createSlice({
  name: 'feed ',
  initialState,
  reducers: {
    selectedTag(state, action: PayloadAction<string | null>) {
      state.selectedTag = action.payload;
    }
  },
})

export const { selectedTag } = feedSlice.actions;