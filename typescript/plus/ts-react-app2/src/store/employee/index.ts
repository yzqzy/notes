import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GET_EMPLOYEE_URL } from '../../constants/urls';
import { EmployeeResponse, EmployeeRequest } from '../../typings/employee';
import { get } from '../../utils/request'

export interface EmployeeState {
  employeeList: EmployeeResponse
}

const initialState: EmployeeState = {
  employeeList: undefined,
}

export const getEmployee = createAsyncThunk(
  "employee/getEmployee",
  async (action: EmployeeRequest) => {
    const ans = await get(GET_EMPLOYEE_URL, action)
    return ans.data
  }
)

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployee.fulfilled, (state, action) => {
      state.employeeList = action.payload;
    })
  }
});

export default employeeSlice.reducer;
