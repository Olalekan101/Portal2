import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BudgetImportService from "./BudgetImportService";
import { toast } from "react-toastify";
import { successAlert, successAlertOff } from "../../Global/GlobalSlice";

// Cost Class Thunks
export const ImportYearlyBudget = createAsyncThunk(
  "import_yearly_budget",
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseData = await BudgetImportService.importYearlyBudget(data);
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
      const responseObject = await BudgetImportService?.getAllDepts();
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
      const responseObject = await BudgetImportService.getAllClasses(query);
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
      const responseData = await BudgetImportService.createCostService(
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
      const responseData = await BudgetImportService.getCostServices();

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
      const responseData = await BudgetImportService.getCostService(id);

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
      const responseData = await BudgetImportService.updateCostService(
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
      const responseData = await BudgetImportService.deleteCostService(id);
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
  name: "cost_center",
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(GetCostClasses.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetCostClasses.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          CostCenterClass: action.payload,
        };
      })
      .addCase(GetCostClasses.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
    builder
      .addCase(ImportYearlyBudget.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(ImportYearlyBudget.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
        };
      })
      .addCase(ImportYearlyBudget.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
    builder
      .addCase(GetCostServices.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetCostServices.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          CostCenterServices: action.payload,
        };
      })
      .addCase(GetCostServices.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
    builder
      .addCase(GetCostService.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetCostService.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          CostCenterService: action.payload,
        };
      })
      .addCase(GetCostService.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
    builder
      .addCase(CreateCostService.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(CreateCostService.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
        };
      })
      .addCase(CreateCostService.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
    builder
      .addCase(UpdateCostService.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(UpdateCostService.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
        };
      })
      .addCase(UpdateCostService.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
    builder
      .addCase(DeleteCostService.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(DeleteCostService.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
        };
      })
      .addCase(DeleteCostService.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const { viewCostClass } = RequestSlice.actions;

export default RequestSlice.reducer;
