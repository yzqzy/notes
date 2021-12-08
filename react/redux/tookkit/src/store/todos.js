import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit';

const todosAdapter = createEntityAdapter();

export const TODOS_FEATURE_KEY = 'todos';

export const loadTodos = createAsyncThunk(
	'todos/loadTodos',
  (payload, thunkAPI) => {
    axios.get(payload).then(response => thunkAPI.dispatch(setTodos(response.data)))
  }
)

const { reducer: ToolsReducer, actions } = createSlice({
  name: TODOS_FEATURE_KEY,
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodo: {
      reducer: todosAdapter.addOne,
      prepare: todo => {
        return {
          payload: { id: Math.random(), ...todo }
        }
      }
    },
    setTodos: todosAdapter.addMany
  },
  extraReducers: {}
});


const { selectAll } = todosAdapter.getSelectors();

export const selectTodos = createSelector(state => state[TODOS_FEATURE_KEY], selectAll);

export const { addTodo, setTodos } = actions;
export default ToolsReducer;