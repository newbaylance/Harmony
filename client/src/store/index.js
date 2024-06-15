import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slicers/counterSlice'

const store =  configureStore({
  reducer: {
    counter: counterReducer
  }
})

export default store