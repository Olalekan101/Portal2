import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CostCenterService from "./CostCenterServices";
import { toast } from "react-toastify";
import { successAlert, successAlertOff } from "../../Global/GlobalSlice";

//GLOBAL THUNK
export const GetGlobalData = createAsyncThunk(
  "cost_center/get_global_data",
  async (arg, { rejectWithValue, getState, dispatch }) => {
    try {
      const returnResponseData = async () => {
        let Branches = getState().costCenter.GlobalData.Branches;
        let Departments = getState().costCenter.GlobalData.Departments;
        if (arg.subGroup === "General") {
          Branches = await CostCenterService.getAllBranches();
          Departments = await CostCenterService.getAllDepts();
        }

        let Employees =
          arg.subGroup === "Employees" &&
          (await CostCenterService.getAllEmployees(arg.val || ""));

        return {
          Branches,
          Departments,
          Employees,
        };
      };

      const responseData = returnResponseData();

      return responseData;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Cost Class Thunks
export const CreateCostClass = createAsyncThunk(
  "cost_center/createNewClass",
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseData = await CostCenterService.createClass(data);
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
export const GetCostClasses = createAsyncThunk(
  "cost_center/getAllClasses",
  async (
    query = { pageSize: 100, pageNumber: 1 },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const responseObject = await CostCenterService.getAllClasses(query);
      return responseObject;
    } catch (error) {
      console.log({ err: error });
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
      const responseData = await CostCenterService.createCostService(formData);
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
  async (query, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseData = await CostCenterService.getCostServices(query);

      // if (responseData?.successful === true) {
      //   dispatch(
      //     successAlert({
      //       message: responseData?.data?.statusMessage,
      //     })
      //   );
      // }
      return responseData?.responseObject;
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
      const responseData = await CostCenterService.getCostService(id);

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
      const responseData = await CostCenterService.updateCostService(formData);
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
      const responseData = await CostCenterService.deleteCostService(id);
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
  GlobalData: {},
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
      .addCase(CreateCostClass.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(CreateCostClass.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
        };
      })
      .addCase(CreateCostClass.rejected, (state, action) => {
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
    builder.addCase(GetGlobalData.fulfilled, (state, action) => ({
      ...state,
      GlobalData: action.payload,
    }));
  },
});

export const { viewCostClass } = RequestSlice.actions;

export default RequestSlice.reducer;
