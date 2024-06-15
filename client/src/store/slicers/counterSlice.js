import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 100,
    data: []
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    fetchUser: (state, action) => {
      state.data = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, fetchUser } = counterSlice.actions

export default counterSlice.reducer