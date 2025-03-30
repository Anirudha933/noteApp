import { configureStore } from '@reduxjs/toolkit'
import notesReducer from '../notes/notesSlice.js'

const store=configureStore({
  reducer: {
    note:notesReducer
  },
})

export default store