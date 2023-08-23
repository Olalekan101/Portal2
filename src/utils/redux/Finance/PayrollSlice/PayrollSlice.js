import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PayrollService from "./PayrollServices";
import { toast } from "react-toastify";
import { successAlert } from "../../Global/GlobalSlice";

export const getPayrollData = createAsyncThunk(
  "payroll/getPayrollData",
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseData = await PayrollService.getPayrollData(data);

      if (responseData?.successful === true) {
        dispatch(
          successAlert({
            message: responseData?.data?.statusMessage,
          })
        );
      }
      return responseData?.responseObject;
    } catch (error) {
      console.log({ error });
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const schedulePayroll = createAsyncThunk(
  "payroll/schedulePayroll",
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseData = await PayrollService.schedulePayroll(data);
      if (responseData?.successful === true) {
        dispatch(
          successAlert({
            message: responseData?.data?.statusMessage,
          })
        );
      } else if (responseData?.statusMessage) {
        toast(responseData?.statusMessage);
        return responseData?.data;
      }
    } catch (err) {
      console.log(err);
      return rejectWithValue(err?.response?.data);
    }
  }
);

const initialState = {
  payrollData: {},
  isLoading: false,
  error: null,
};

const reducers = {
  viewPayroll(state, action) {
    return { ...state, data: action.payload };
  },
};

export const PayrollSlice = createSlice({
  name: "payroll",
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(getPayrollData.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(getPayrollData.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          payrollData: action.payload,
        };
      })
      .addCase(getPayrollData.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
    builder
      .addCase(schedulePayroll.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(schedulePayroll.fulfilled, (state) => {
        return {
          ...state,
          isLoading: false,
        };
      })
      .addCase(schedulePayroll.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const { viewPayroll } = PayrollSlice.actions;

export default PayrollSlice.reducer;
