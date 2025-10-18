import { configureStore, createSlice } from "@reduxjs/toolkit";

// Slice مبدئي لتجربة الـ store
const dummySlice = createSlice({
  name: "dummy",
  initialState: { value: "Redux store working ✅" },
  reducers: {},
});

export const store = configureStore({
  reducer: {
    dummy: dummySlice.reducer,
  },
});
