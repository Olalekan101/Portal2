import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PermissionService } from "./PermissionService";
import { toast } from "react-toastify";

export const GetAllAppPermissions = createAsyncThunk(
    "permission/AllAppPermission",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await PermissionService.permission().GetAllAppPermissions();
            if(response.data?.statusCode === "00") {
                const permissionObj = response.data.responseObject; // .map(a => a.name);
                const permissionArr = response.data.responseObject.map(a => a.name);
                return [permissionObj, permissionArr];
            }
            return [];
        } catch (error) {
            toast.error(error?.response?.data?.statusMessage);
            return rejectWithValue(error?.response?.data);
        }
    }
);


export const GetAllUsersPermissions = createAsyncThunk(
    "permission/AllUserPermission",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await PermissionService.permission().GetAllUsersPermissions(payload);
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.statusMessage);
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const GetUserPermission = createAsyncThunk(
    "permission/UserPermissions",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await PermissionService.permission().GetUserPermissionById(payload);
            return response.data.responseObject;
        } catch (error) {
            toast.error(error?.response?.data?.statusMessage);
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const GetCurrentUserPermissions = createAsyncThunk(
    "permission/CurrentUserPermission",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await PermissionService.permission().GetCurrentUserPermissions();
            if(response.data?.statusCode === "00") {
                const permissionArr = response.data.responseObject.permsissions.map(a=>a.permission);
                localStorage.setItem(
                    "x-u-perm",
                    JSON.stringify(permissionArr, null, 2)
                );
                return response.data.responseObject;
            }
            return [];
        } catch (error) {
            toast.error(error?.response?.data?.statusMessage);
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const UpdateStaffPermission = createAsyncThunk(
    "permission/UpdateStaffPermissions",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const response = await PermissionService.permission().UpdateStaffPermissions(payload);
                return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.statusMessage);
            return rejectWithValue(error?.response?.data);
        }
    }
);

const initialState = {
    isLoading: false,
    isSuccessful: false,
    userPermissions: [],
    allAppPermissionsList: [],
    allAppPermissionsObj: [],
    allUsersPermissions: [],
    currentUserPermission: [],
    userPermissionByID: {},
    error: null,
};

export const PermissionSlice = createSlice({
    name: "permission",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(GetAllAppPermissions.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                };
            })
            .addCase(GetAllAppPermissions.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isSuccessful: true,
                    allAppPermissionsObj: action.payload[0],
                    allAppPermissionsList: action.payload[1],
                };
            })
            .addCase(GetAllAppPermissions.rejected, (state, action) => {
                return {
                    isLoading: false,
                    isSuccessful: false,
                    error: action.payload,
                };
            })
            .addCase(GetAllUsersPermissions.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                };
            })
            .addCase(GetAllUsersPermissions.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isSuccessful: true,
                    allUsersPermissions: action.payload,
                };
            })
            .addCase(GetAllUsersPermissions.rejected, (state, action) => {
                return {
                    isLoading: false,
                    error: action.payload,
                };
            })
            .addCase(GetUserPermission.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                };
            })
            .addCase(GetUserPermission.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isSuccessful: true,
                    userPermissionByID: action.payload,
                };
            })
            .addCase(GetUserPermission.rejected, (state, action) => {
                return {
                    isLoading: false,
                    error: action.payload,
                };
            })
            .addCase(GetCurrentUserPermissions.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                };
            })
            .addCase(GetCurrentUserPermissions.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isSuccessful: true,
                    currentUserPermission: action.payload,
                };
            })
            .addCase(GetCurrentUserPermissions.rejected, (state, action) => {
                return {
                    isLoading: false,
                    isSuccessful: false,
                    error: action.payload,
                };
            })
            .addCase(UpdateStaffPermission.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                };
            })
            .addCase(UpdateStaffPermission.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    isSuccessful: true,
                };
            })
            .addCase(UpdateStaffPermission.rejected, (state, action) => {
                return {
                    isLoading: false,
                    isSuccessful: false,
                    error: action.payload,
                };
            });
    },
});

export default PermissionSlice.reducer;
