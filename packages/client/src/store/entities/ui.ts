import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  windowWidth: number;
  prefersDarkMode: boolean;
  isLoading: boolean;
  mobileSidebarOpen: boolean;
  sidebarWidth: number;
  bookListWidth: number;
  globalInfo?: string;
  globalError?: string;
}

const initialState: State = {
  windowWidth: window.innerWidth,
  prefersDarkMode: false,
  isLoading: false,
  mobileSidebarOpen: false,
  sidebarWidth: Number(localStorage.getItem('sidebarWidth')) || 235,
  bookListWidth: Number(localStorage.getItem('bookListWidth')) || 325,
};

export const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setWindowWidth(state, action: PayloadAction<number>) {
      state.windowWidth = action.payload;
    },
    setPrefersDarkMode(state, action: PayloadAction<boolean>) {
      state.prefersDarkMode = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setMobileSidebarOpen(state, action: PayloadAction<boolean>) {
      state.mobileSidebarOpen = action.payload;
    },
    setSidebarWidth(state, action: PayloadAction<number>) {
      localStorage.setItem('sidebarWidth', action.payload.toString());
      state.sidebarWidth = action.payload;
    },
    setBookListWidth(state, action: PayloadAction<number>) {
      localStorage.setItem('bookListWidth', action.payload.toString());
      state.bookListWidth = action.payload;
    },
    setGlobalInfo(state, action: PayloadAction<string>) {
      state.globalInfo = action.payload;
    },
    setGlobalError(state, action: PayloadAction<string>) {
      state.globalError = action.payload;
    },
  },
});

export const {
  setWindowWidth,
  setPrefersDarkMode,
  setIsLoading,
  setMobileSidebarOpen,
  setSidebarWidth,
  setBookListWidth,
  setGlobalInfo,
  setGlobalError,
} = slice.actions;

export const reducer = slice.reducer;
