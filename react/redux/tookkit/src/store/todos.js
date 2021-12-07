import { createSlice } from '@reduxjs/toolkit';

export const TODOS_FEATURE_KEY = 'todos';

const { reducer: ToolsReducer, actions } = createSlice({
  name: TODOS_FEATURE_KEY,
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload)
    }
  }
});

export const { addTodo } = actions;
export default ToolsReducer;