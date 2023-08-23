import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ReportServices} from "./ReportService";

export const GetReports = createAsyncThunk(
    "reports/GetReports",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const response =
                await ReportServices.report().getReports(payload);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const AddReport = createAsyncThunk(
    "reports/AddReport",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const response =
                await ReportServices.report().addReport(payload);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const GetReportByID = createAsyncThunk(
    "reports/GetReportByID",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const response =
                await ReportServices.report().getReportByID(payload);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);


export const TriggerReport = createAsyncThunk(
    "reports/TriggerReport",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const response =
                await ReportServices.report().triggerReport(payload);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const UpdateReport = createAsyncThunk(
    "reports/GetReportByID",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const response =
                await ReportServices.report().updateReport(payload);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

const initialState = {
    reports: null,
    isLoading: false,
    isSuccessful: false,
};


export const ReportSlice = createSlice({
    name: "report",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(GetReports.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                };
            })
            .addCase(GetReports.fulfilled, (state, action) => {
                return {
                    ...state,
                    isSuccessful: true,
                    isLoading: false,
                    reports: action.payload,
                };
            })
            .addCase(GetReports.rejected, (state, action) => {
                return {
                    ...state,
                    isSubmitting: false,
                    error: action.payload,
                };
            })
            .addCase(AddReport.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                    isSuccessful: false,
                };
            })
            .addCase(AddReport.fulfilled, (state, action) => {
                return {
                    ...state,
                    isSuccessful: true,
                    isLoading: false,
                    reports: action.payload,
                };
            })
            .addCase(AddReport.rejected, (state, action) => {
                return {
                    ...state,
                    isSubmitting: false,
                    error: action.payload,
                };
            });
    },
});

export default ReportSlice.reducer;
