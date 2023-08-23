import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HRServices } from "./HRService";
import { toast } from "react-toastify";
import { successAlert } from "../Global/GlobalSlice";

  export const GetRSA = createAsyncThunk(
      "hr/GetRsa",
      
      async (payload, { rejectWithValue, getState, dispatch }) => {
          console.log(payload)
          try {
            
            const response = await HRServices.hrService().GetRSA(payload);
            console.log(response.data)
            return response?.data;
          } catch (error) {
            toast.error(error?.response?.data?.statusMessage);
            return rejectWithValue(error?.response?.data);
          }
        }
  )

export const GetAllEmployees= createAsyncThunk(
    "hr/GetEmployees",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.hrService().GetEmployees(payload);
        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  export const GetLeaveTypes= createAsyncThunk(
    "hr/GetLeaveTypes",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.hrService().GetLeaveTypes(payload);
        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  export const GetAllDepartments= createAsyncThunk(
    "hr/GetDepartments",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.hrService().GetAllDepartments(payload);
        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  
  export const GetUnits= createAsyncThunk(
    "hr/GetUnits",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.hrService().GetUnits(payload);
        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  export const CreateLeaveRequest = createAsyncThunk(
    "hr/CreateLeaveRequest",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.hrService().CreateLeaveRequest(payload);
        console.log(response)
        if (response?.data?.successful === true) {
          dispatch(
            successAlert({
              message: response?.data?.statusMessage,
            })
          );
        }
        return response?.data;
      } catch (error) {
        console.log(error)
        console.log(toast.error(error?.response?.data?.statusMessage));
        return rejectWithValue(error?.response?.data);
      }
    }
  )

  export const UpdateLeaveRequest = createAsyncThunk(
    "hr/UpdateLeaveRequest",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.hrService().UpdateLeaveRequest(payload);
        //console.log(response)
        if (response?.data?.successful === true) {
          dispatch(
            successAlert({
              message: response?.data?.statusMessage,
            })
          );
        }
        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  )

  export const GetSingleLeaveRequest = createAsyncThunk(
    "hr/GetSingleLeaveRequest",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
             //console.log(payload)
        const response = await HRServices.hrService().GetSingleLeaveRequest(payload);
        if (response?.data?.successful === true) {
          dispatch(
            successAlert({
              message: response?.data?.statusMessage,
            })
          );
        }
        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  )

  export const GetMyLeaveRequest = createAsyncThunk(
    "hr/MyLeaveRequest",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
      // console.log(payload)
        const response = await HRServices.hrService().GetMyLeaveRequest(payload);

        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  )
  export const GetAllLeaveRequest = createAsyncThunk(
    "hr/AllLeaveRequest",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
      // console.log(payload)
        const response = await HRServices.hrService().GetAllLeaveRequest(payload);

        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  )

  export const GetByDepartment = createAsyncThunk(
    "hr/GetByDepartment",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
      // console.log(payload)
        const response = await HRServices.hrService().GetByDepartment(payload);

        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  )
  export const ApproveLeave = createAsyncThunk(
    "hr/ApproveLeave",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
      // console.log(payload)
        const response = await HRServices.hrService().ApproveLeave(payload);
        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  )
  export const DeclineLeave = createAsyncThunk(
    "hr/DeclineLeave",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
      console.log(payload)
        const response = await HRServices.hrService().DeclineLeave(payload);
        console.log(response.data)
        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  )
 
  export const CancelLeave = createAsyncThunk(
    "hr/CancelLeave",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
      // console.log(payload)
        const response = await HRServices.hrService().CancelLeave(payload);
     
        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  )
  export const ApproveOrDecline = createAsyncThunk(
    "hr/ApproveOrDecline",
    async (payload,{rejectWithValue, getState,dispatch})=>{
        try {
            const response = await HRServices.hrService().ApproveOrDecline(payload)
            dispatch(
                successAlert({
                  message: response?.data?.statusMessage,
                })
              );
              return response.data
        } catch (error) {
            toast.error(error?.response?.data.statusMessage);
            return rejectWithValue(error?.response?.data)
        }
       
    }
  )

  // Start of Training Requisition

  export const CreateTrainingRequisition = createAsyncThunk(
    "training/CreateTrainingRequisition",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response =
          await HRServices.trainingRequisition().CreateRequisition(payload);

          if (response?.data?.successful === true) {
            dispatch(
              successAlert({
                message: response?.data?.statusMessage,
              })
            );
          }
        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  export const UpdateTrainingRequisition = createAsyncThunk(
    "training/CreateTrainingRequisition",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response =
          await HRServices.trainingRequisition().UpdateRequisition(payload);

          if (response?.data?.successful === true) {
            dispatch(
              successAlert({
                message: response?.data?.statusMessage,
              })
            );
          }
        return response?.data;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  export const GetAllEmployeesTrainingRequisitions = createAsyncThunk(
    "training/GetAllEmployeesTrainingRequisitions",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.trainingRequisition().GetAllEmployeeTraining(payload);
        // toast.success(response?.data?.statusMessage);
        return response?.data?.responseObject;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  export const GetEmployeeTrainingRequisitions = createAsyncThunk(
    "training/GetEmployeeTrainingRequisitions",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const response = await HRServices.trainingRequisition().GetEmployeeTraining(payload);
        // toast.success(response?.data?.statusMessage);
        return response?.data?.responseObject;
      } catch (error) {
        toast.error(error?.response?.data?.statusMessage);
        return rejectWithValue(error?.response?.data);
      }
    }
  );


const initialState = {
    hr: "",
}

export const HRSlice = createSlice({
 name:"hr",
 initialState,

 extraReducers:(builder)=>{
  builder.addCase(GetRSA.pending, (state)=>{
      return {
          ...state,
          isLoadingRsa: true,
        }; 
  })
  .addCase(GetRSA.fulfilled, (state, action) => {
      return {
        ...state,
        isLoadingRsa: false,
        isSuccessful: true,
        get_RSA: action.payload,
      };
    })
    .addCase(GetRSA.rejected, (state, action) => {
      return {
        ...state,
        isLoadingRsa: false,
        error: action.payload,
      };
    });

  builder.addCase(GetAllEmployees.pending, (state)=>{
      return {
          ...state,
          isLoadingEmployees: true,
        }; 
  })
  .addCase(GetAllEmployees.fulfilled, (state, action) => {
      return {
        ...state,
        isLoadingEmployees: false,
        isSuccessful: true,
        all_employees: action.payload,
      };
    })
    .addCase(GetAllEmployees.rejected, (state, action) => {
      return {
        ...state,
        isLoadingEmployees: false,
        error: action.payload,
      };
    });
    builder.addCase(GetLeaveTypes.pending, (state, action)=>{
      return {
          ...state,
          isLoading:true
      };
    });
    builder.addCase(GetLeaveTypes.fulfilled, (state, action)=>{
      return {
          ...state,
          isLoading:false,
          isSuccessful:true,
          leave_types:action.payload
      };
    });

    builder.addCase(GetLeaveTypes.rejected, (state, action)=>{
      return {
          ...state,
          error:action.payload
        
      };
    });

    builder.addCase(GetAllDepartments.pending, (state, action)=>{
      return {
          ...state,
          isLoadingDepartment:true
      };
    });
    builder.addCase(GetAllDepartments.fulfilled, (state, action)=>{
      return {
          ...state,
          isLoadingDepartment:false,
          isSuccessful:true,
          all_departments:action.payload
      };
    });

    builder.addCase(GetAllDepartments.rejected, (state, action)=>{
      return {
          ...state,
          error:action.payload
        
      };
    });
    
    builder.addCase(GetUnits.pending, (state, action)=>{
      return {
          ...state,
          isLoadingUnit:true
      };
    });
    builder.addCase(GetUnits.fulfilled, (state, action)=>{
      return {
          ...state,
          isLoadingUnit:false,
          isSuccessful:true,
          units:action.payload
      };
    });

    builder.addCase(GetUnits.rejected, (state, action)=>{
      return {
          ...state,
          error:action.payload
        
      };
    });

    builder.addCase(CreateLeaveRequest.pending, (state, action)=>{
      return {
          ...state,
          isLoadingLeave:true
      };
    });
    builder.addCase(CreateLeaveRequest.fulfilled, (state, action)=>{
      return {
          ...state,
          isLoadingLeave:false,
          isSuccessful:true,
          leave_request:action.payload
      };
    });

    builder.addCase(CreateLeaveRequest.rejected, (state, action)=>{
      return {
          ...state,
          error:action.payload
        
      };
    });

    builder.addCase(UpdateLeaveRequest.pending, (state, action)=>{
      return {
          ...state,
          isLoadingLeave:true
      };
    });
    builder.addCase(UpdateLeaveRequest.fulfilled, (state, action)=>{
      return {
          ...state,
          isLoadingLeave:false,
          isSuccessful:true,
          leave_request:action.payload
      };
    });

    builder.addCase(UpdateLeaveRequest.rejected, (state, action)=>{
      return {
          ...state,
          error:action.payload
        
      };
    });
    builder.addCase(GetSingleLeaveRequest.pending, (state, action)=>{
      return {
          ...state,
          isLoading:true
      };
    });
    builder.addCase(GetSingleLeaveRequest.fulfilled, (state, action)=>{
      return {
          ...state,
          isLoading:false,
          isSuccessful:true,
          get_request:action.payload
      };
    });

    builder.addCase(GetSingleLeaveRequest.rejected, (state, action)=>{
      return {
          ...state,
          error:action.payload
        
      };
    });
    
    builder.addCase(GetMyLeaveRequest.pending, (state, action)=>{
      return {
          ...state,
          isLoading:true
      };
    });
    builder.addCase(GetMyLeaveRequest.fulfilled, (state, action)=>{
      return {
          ...state,
          isLoadingAction:false,
          isSuccessful:true,
          get_myrequest:action.payload
      };
    });

    builder.addCase(GetAllLeaveRequest.rejected, (state, action)=>{
      return {
          ...state,
          error:action.payload
        
      };
    });

    builder.addCase(GetAllLeaveRequest.pending, (state, action)=>{
      return {
          ...state,
          isLoading:true
      };
    });
    builder.addCase(GetAllLeaveRequest.fulfilled, (state, action)=>{
      return {
          ...state,
          isLoadingAction:false,
          isSuccessful:true,
          all_request:action.payload
      };
    });

    builder.addCase(GetMyLeaveRequest.rejected, (state, action)=>{
      return {
          ...state,
          error:action.payload
        
      };
    });


    builder.addCase(GetByDepartment.pending, (state, action)=>{
      return {
          ...state,
          isLoading:true
      };
    });
    builder.addCase(GetByDepartment.fulfilled, (state, action)=>{
      return {
          ...state,
          isLoadingAction:false,
          isSuccessful:true,
          get_department:action.payload
      };
    });

    builder.addCase(GetByDepartment.rejected, (state, action)=>{
      return {
          ...state,
          error:action.payload
        
      };
    });

    builder.addCase(ApproveLeave.pending, (state, action)=>{
      return {
          ...state,
          isLoading:true
      }
    })
    builder.addCase(ApproveLeave.fulfilled, (state, action)=>{
      return {
          ...state,
          isLoading:true,
          isSuccessful:false,
          approve_leave:action.payload
      }
    })

    builder.addCase(ApproveLeave.rejected, (state, action)=>{
      return {
          ...state,
          error:action.payload
        
      };
    });

    builder.addCase(DeclineLeave.pending, (state, action)=>{
      return {
          ...state,
          isLoading:true
      }
    })
    builder.addCase(DeclineLeave.fulfilled, (state, action)=>{
      return {
          ...state,
          isLoading:true,
          isSuccessful:true,
          decline_leave:action.payload
      }
    })

    builder.addCase(DeclineLeave.rejected, (state, action)=>{
      return {
          ...state,
          error:action.payload
        
      }
    })

    builder.addCase(CancelLeave.pending, (state, action)=>{
      return {
          ...state,
          isLoading:true
      }
    })
    builder.addCase(CancelLeave.fulfilled, (state, action)=>{
      return {
          ...state,
          isLoading:true,
          isSuccessful:true,
          cancel_leave:action.payload
      }
    })

    builder.addCase(CancelLeave.rejected, (state, action)=>{
      return {
          ...state,
          error:action.payload
        
      }
    })
    builder.addCase(GetAllEmployeesTrainingRequisitions.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetAllEmployeesTrainingRequisitions.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        all_emp_req: action.payload,
      };
    });
    builder.addCase(GetAllEmployeesTrainingRequisitions.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });

    builder.addCase(GetEmployeeTrainingRequisitions.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(GetEmployeeTrainingRequisitions.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        emp_req: action.payload,
      };
    });
    builder.addCase(GetEmployeeTrainingRequisitions.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    });
 }

})

export default HRSlice.reducer;