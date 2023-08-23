import axios from "axios";
import { api } from "../../../api";

const root = process.env.REACT_APP_BACKEND_FINANCE_URL;
const route = api(root, "multipart/form-data");
const token = JSON.parse(localStorage.getItem("user"))?.userToken;

/**ALL API CALL FUNCTIONS EXPORTED AS AN OBJECT OF METHODS */

const BudgetImportService = {
  // Create cost class
  async importYearlyBudget(importfile) {
    let { data } = await route.post(
      "/BudgetImport/ImportYearlyBudgetCommand",
      { importfile },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log({ createClass: data });

    return data;
  },

  // Get all cost classes
  async getAllClasses({ pageNumber, pageSize }) {
    let { data } = await route.get(
      `/CostCenterSetup/GetAllCostCenterClass?PageSize=${pageSize}&PageNumber=${pageNumber}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // console.log({resDataD: res.data})

    return data.responseObject;
  },

  // Get Departments, Branches, and Employees
  async getAllBranches() {
    let { data } = await route.get(
      "https://bpmapi-dev.nlpcpfa.com/HRService/api/Container/AllContainer",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    console.log({ resData: data });

    return data.responseObject;
  },
  async getAllDepts() {
    let { data } = await route.get(
      "https://bpmapi-dev.nlpcpfa.com/HRService/api/Container/GetAllContainer",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    console.log({ resData: data });

    return data.responseObject;
  },
  async getAllEmployees() {
    let { data } = await route.get(
      "https://bpmapi-dev.nlpcpfa.com/HRService/api/Employee/GetAllEmployees?PageSize=100&PageNumber=1",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    console.log({ resData: data });

    return data.responseObject;
  },

  // Create table data POST method
  async createCostService(formData) {
    let { data } = await route.post("/CostCenter", formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log({ createCostService: data });

    return data;
  },

  // Get all created table data
  async getCostServices({
    Search,
    DeptID,
    EmployeeID,
    BranchID,
    CostClassID,
    PageSize,
    PageNumber,
  }) {
    let { data } = await route.get(
      `
        /CostCenter/all?
            PageSize=${PageSize}
            &PageNumber=${PageNumber}
            ${Search ? `&Search=${Search}` : ""}
            ${DeptID ? `&DeptID=${DeptID}` : ""}
            ${EmployeeID ? `&EmployeeID=${EmployeeID}` : ""}
            ${BranchID ? `&BranchID=${BranchID}` : ""}
            ${CostClassID ? `&CostClassID=${CostClassID}` : ""}
        `,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    console.log({ getCostServices: data });

    return data;
  },

  //Get single cost service
  async getCostService(id) {
    let { data } = await route.get(`/CostCenter/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log({ getCostService: data });
    return data;
  },

  //Update the cost service
  async updateCostService(formData) {
    let { data } = await route.post("/CostCenter/update", formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log({ updateCostService: data });
    return data;
  },

  //Delete the cost service
  async deleteCostService(id) {
    let { data } = await route.post(
      "/CostCenterSetup/delete",
      { id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log({ deleteCostService: data });
    return data;
  },
};

export default BudgetImportService;
