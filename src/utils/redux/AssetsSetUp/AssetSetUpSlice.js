import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
import { successAlert } from "../Global/GlobalSlice";

const service = process.env.REACT_APP_BACKEND_ASSETS_URL;
export const asset_api = api(service);

export const GetAssetBudget = createAsyncThunk(
  "assets/GetAssetBudget",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, searchText } = payload;
    try {
      const response = await asset_api.get(
        `Budget?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&searchText=${
          searchText || ""
        }`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UploadAssetBudget = createAsyncThunk(
  "assets/UploadAssetBudget",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(`Budget/upload`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAssetRegister = createAsyncThunk(
  "assets/CreateAssetRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, searchText } = payload;
    try {
      const response = await asset_api.get(
        `Asset?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&searchText=${
          searchText || ""
        }`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAssetSingleRegister = createAsyncThunk(
  "assets/CreateAssetRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.get(
        `Asset/${payload}?id=${payload}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const ApproveAssetSingleRegister = createAsyncThunk(
  "assets/CreateAssetRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(`Asset/approve`, payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeclineAssetSingleRegister = createAsyncThunk(
  "assets/CreateAssetRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(`Asset/decline`, payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const DeleteAssetSingleRegister = createAsyncThunk(
  "assets/CreateAssetRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(`Asset/delete`, payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateAssetRegister = createAsyncThunk(
  "assets/CreateAssetRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(`Asset/Add`, payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const EditAssetRegisterSingle = createAsyncThunk(
  "assets/CreateAssetRegister",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(`Asset/update`, payload);
      if (response?.data?.successful === true) {
        dispatch(
          successAlert({
            message: response?.data?.statusMessage,
          })
        );
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateAssetCategories = createAsyncThunk(
  "assets/CreateAssetClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(`AssetCategory/Add`, payload);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateAssetCategories = createAsyncThunk(
  "assets/CreateAssetClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `AssetCategory/Update?id=${payload.categoryId}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateAssetClass = createAsyncThunk(
  "assets/CreateAssetClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(`AssetClass/Add`, payload);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateAssetClass = createAsyncThunk(
  "assets/CreateAssetClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `AssetClass/Update?id=${payload?.assetClassId}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const CreateAssetSubClass = createAsyncThunk(
  "assets/CreateAssetClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(`AssetSubClass/Add`, payload);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateAssetSubClass = createAsyncThunk(
  "assets/CreateAssetClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.post(
        `AssetSubClass/Update?id=${payload?.assetSubClassId}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetCategories = createAsyncThunk(
  "assets/GetCategories",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, Name } = payload;
    try {
      const response = await asset_api.get(
        `AssetCategory?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&Name=${
          Name || ""
        }`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetSingleCategories = createAsyncThunk(
  "assets/GetSingleCategories",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await asset_api.get(
        `AssetCategory/${payload}?id=${payload}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAssetSubClass = createAsyncThunk(
  "assets/GetAssetSubClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const {
      filter,
      sort,
      pageSize,
      currentPage,
      Name,
      CategoryId,
      AssetClassId,
    } = payload;
    try {
      const response = await asset_api.get(
        `AssetSubClass?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&Name=${
          Name || ""
        }&CategoryId=${CategoryId || 0}&AssetClassId=${AssetClassId || 0}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAssetClass = createAsyncThunk(
  "assets/GetAssetClass",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { filter, sort, pageSize, currentPage, Name, CategoryId } = payload;
    try {
      const response = await asset_api.get(
        `AssetClass?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}&Name=${
          Name || ""
        }&CategoryId=${CategoryId || ""}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAssetComponent = createAsyncThunk(
  "assets/GetAssetComponent",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { Name, CategoryId, AssetClassId, AssetSubClassId } = payload;
    try {
      const response = await asset_api.get(
        `AssetComponent?Name=${
          Name || ""
        }&CategoryId=${CategoryId}&AssetClassId=${AssetClassId}&AssetSubClassId=${AssetSubClassId}`,
        payload
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  assetsSetup: "",
};

export const AssetSetUpSlice = createSlice({
  name: "assetsSetUp",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(UploadAssetBudget.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(UploadAssetBudget.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          asset_budget_upload: action.payload,
        };
      })
      .addCase(UploadAssetBudget.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
    builder
      .addCase(GetAssetBudget.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetAssetBudget.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          asset_budget: action.payload,
        };
      })
      .addCase(GetAssetBudget.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
    builder
      .addCase(GetSingleCategories.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetSingleCategories.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          single_category: action.payload,
        };
      })
      .addCase(GetSingleCategories.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
    builder
      .addCase(CreateAssetClass.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(CreateAssetClass.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          created_asset_class: action.payload,
        };
      })
      .addCase(CreateAssetClass.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
    builder
      .addCase(CreateAssetRegister.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(CreateAssetRegister.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          asset_register: action.payload,
        };
      })
      .addCase(CreateAssetRegister.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
    builder
      .addCase(GetCategories.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetCategories.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          category: action.payload,
        };
      })
      .addCase(GetCategories.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetAssetComponent.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetAssetComponent.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          asset_component: action.payload,
        };
      })
      .addCase(GetAssetComponent.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetAssetClass.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetAssetClass.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          asset_class: action.payload,
        };
      })
      .addCase(GetAssetClass.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });

    builder
      .addCase(GetAssetSubClass.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(GetAssetSubClass.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isSuccessful: true,
          asset_sub_class: action.payload,
        };
      })
      .addCase(GetAssetSubClass.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      });
  },
});

export default AssetSetUpSlice.reducer;
