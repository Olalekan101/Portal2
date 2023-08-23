import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PaymentSetupService from "./PaymentSetupService";
import { toast } from "react-toastify";
import { successAlert, successAlertOff } from "../../Global/GlobalSlice";

// Cost Class Thunks
export const CreatePaymentSetup = createAsyncThunk(
  "payment_setup",
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseData = await PaymentSetupService.createPaymentSetup(data);
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
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetAllDept = createAsyncThunk(
  "payment_setup/getAllClasses",
  async (query, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseObject = await PaymentSetupService?.getAllDepts();
      return responseObject;
    } catch (error) {
      console.log(error?.response);
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetCostClasses = createAsyncThunk(
  "cost_center/getAllClasses",
  async (query, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseObject = await PaymentSetupService.getAllClasses(query);
      return responseObject;
    } catch (error) {
      console.log(error?.response);
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Cost Services Thunks
export const CreateCostService = createAsyncThunk(
  "cost_center/createNewRecord",
  async (formData, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseData = await PaymentSetupService.createCostService(
        formData
      );
      if (responseData?.successful === true) {
        dispatch(
          successAlert({
            message: responseData?.data?.statusMessage,
          })
        );
      }
      return responseData?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetCostServices = createAsyncThunk(
  "cost_center/getAllRecords",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseData = await PaymentSetupService.getCostServices();

      if (responseData?.successful === true) {
        dispatch(
          successAlert({
            message: responseData?.data?.statusMessage,
          })
        );
      }
      return responseData?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const GetCostService = createAsyncThunk(
  "cost_center/getRecord",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseData = await PaymentSetupService.getCostService(id);

      if (responseData?.successful === true) {
        dispatch(
          successAlert({
            message: responseData?.data?.statusMessage,
          })
        );
      }
      return responseData?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const UpdateCostService = createAsyncThunk(
  "cost_center/updateRecord",
  async (formData, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseData = await PaymentSetupService.updateCostService(
        formData
      );
      if (responseData?.successful === true) {
        dispatch(
          successAlert({
            message: responseData?.data?.statusMessage,
          })
        );
      }
      return responseData?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const DeleteCostService = createAsyncThunk(
  "cost_center/deleteRecord",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseData = await PaymentSetupService.deleteCostService(id);
      if (responseData?.successful === true) {
        dispatch(
          successAlert({
            message: responseData?.data?.statusMessage,
          })
        );
      }
      return responseData?.data;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  CostCenterService: {},
  SelectedService: {},
  CostCenterClass: {},
  SelectedClass: {},
  isLoading: false,
  error: null,
};

const reducers = {
  viewCostClass(state, action) {
    return { ...state, SelectedClass: action.payload };
  },
};

export const RequestSlice = createSlice({
  name: "payment_setup",
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(CreatePaymentSetup.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(CreatePaymentSetup.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
        };
      })
      .addCase(CreatePaymentSetup.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const { viewCostClass } = RequestSlice.actions;

export default RequestSlice.reducer;
