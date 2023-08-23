import { api } from "../../api";

const hrService = () => {
  const hr = process.env.REACT_APP_BACKEND_HR_URL;
  const eps_env = process.env.REACT_APP_BACKEND_EPS_URL;
  const hr_api = api(hr);
  const eps_api = api(eps_env);

  return {
    GetRSA: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return eps_api.get(`/v2/SelfServices/getrsa${params}`, data);
    },
    GetEmployees: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/employee/getAllEmployees${params}`, data);
    },

    GetLeaveTypes: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/EmployeeLeaveType${params}`, data);
    },

    GetAllDepartments: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/Department/AllDepartment${params}`, data);
    },
    GetUnits: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/Container/AllContainer${params}`, data);
    },

    CreateLeaveRequest: function (data) {
      return hr_api.post(`/EmployeeLeaveRequisition`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    UpdateLeaveRequest: function (data) {
      return hr_api.post(`/EmployeeLeaveRequisition/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    GetSingleLeaveRequest: function (data) {
      return hr_api.get(`/EmployeeLeaveRequisition/${data}`, data);
    },
    GetMyLeaveRequest: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/EmployeeLeaveRequisition/my${params}`, data);
    },

    GetAllLeaveRequest: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/EmployeeLeaveRequisition/${params}`, data);
    },

    GetByDepartment: function (data) {
      let params = "?";
      for (let [key, value] of Object.entries(data)) {
        params = params + `${key}=${value}&`;
      }
      params = params.replace(/^&/, "");
      return hr_api.get(`/EmployeeLeaveRequisition/GetByDepartment${params}`, data);
    },


    ApproveLeave: function (data) {
      return hr_api.post(`/EmployeeLeaveRequisition/approve`, data);
      ;
    },

    DeclineLeave: function (data) {
      return hr_api.post(`/EmployeeLeaveRequisition/reject`, data);

    },

    CancelLeave: function (data) {
      return hr_api.post(`/EmployeeLeaveRequisition/cancel`, data);

    },
  };
};

const trainingRequisition = () => {
    const root = process.env.REACT_APP_BACKEND_HR_URL;
    const route = api(root);
  

    return{
      CreateRequisition: function (data) {
        return route.post(`/EmployeeTrainingRequisition`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
      UpdateRequisition: function (data) {
        return route.post(`/EmployeeTrainingRequisition/Update`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
      ApproveRequisition: function(data){
        return route.post(`/EmployeeTrainingRequisition/Approve`, data);
      },
      DeclineRequisition: function(data){
        return route.post(`/EmployeeTrainingRequisition/Decline`, data);
      },
      GetAllEmployeeTraining: function (data){
        const { currentPage, pageSize, filter, searchQuery, startDate, endDate, sort } = data;
        return route.get(
          `/EmployeeTrainingRequisition/AllEmployeesTraining/?pageNumber=${currentPage || 1}&pageSize=${
            pageSize || 1
          }&ApprovalStatus=${filter}&Search=${searchQuery}&StartDate=${startDate}&EndDate=${endDate}&SortBy=${sort}`,
          data
        );      
      },
      GetEmployeeTraining: function (data) {
        return route.get(`/EmployeeTrainingRequisition/${data}`, data);
      },
      ApproveOrDeclineBatchEmployeeTrainingRequest: function(data){
        return route.post(`/EmployeeTrainingRequisition/RangeOfApproveOrDecline`, data);
      },
    }
}

export const HRServices = {
    trainingRequisition: trainingRequisition,
    hrService: hrService,
};