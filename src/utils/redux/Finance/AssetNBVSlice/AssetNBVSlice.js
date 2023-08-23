import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AssetNBVService from "./AssetNBVServices";
import { toast } from "react-toastify";
import { successAlert } from "../../Global/GlobalSlice";

export const getAllAssets = createAsyncThunk(
  "asset_nbv/getAllAssets",
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      const responseData = await AssetNBVService.getAssets(data);

      if (responseData?.successful === true) {
        dispatch(
          successAlert({
            message: responseData?.data?.statusMessage,
          })
        );
      }
      return responseData?.responseObject;
    } catch (error) {
      toast.error(error?.response?.data?.statusMessage);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  assetData: {},
  isLoading: false,
  error: null,
};

const reducers = {
  viewAssets(state, action) {
    return { ...state, assetData: action.payload };
  },
};

export const RequestSlice = createSlice({
  name: "asset_nbv",
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssets.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(getAllAssets.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          assetData: action.payload,
        };
      })
      .addCase(getAllAssets.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
        };
      });
  },
});

export const { viewAssets } = RequestSlice.actions;

export default RequestSlice.reducer;
