import axios from "axios";
import { api } from "../../../api";

const root = process.env.REACT_APP_BACKEND_FINANCE_URL;
const route = api(root);
const token = JSON.parse(localStorage.getItem("user"))?.userToken;

/**ALL API CALL FUNCTIONS EXPORTED AS AN OBJECT OF METHODS */

const CostCenterService = {
  // Create cost class
  async createClass({ costClassName }) {
    let { data } = await route.post(
      "/CostCenterSetup",
      { costClassName },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log({createClass: data})

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

    return data.responseObject;
  },

  // Get Departments, Branches, and Employees
  async getAllBranches() {
    try {
      let { data } = await axios.get(
        "https://bpmapi-dev.nlpcpfa.com/HRService/api/Container/AllContainer?PageSize=100&PageNumber=1",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      return data.responseObject.pageItems;
    } catch (e) {
      console.error({ err: e.response || e });
    }
  },
  async getAllDepts() {
    try {
      let { data } = await axios.get(
        "https://bpmapi-dev.nlpcpfa.com/HRService/api/Department/AllDepartment?PageSize=100&PageNumber=1",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      return data.responseObject.pageItems;
    } catch (e) {
      console.log({ deptError: e.response.data || e });
      return e.response.data;
    }
  },
  async getAllEmployees(Search = "") {
    try {
      let { data } = await axios.get(
        `https://bpmapi-dev.nlpcpfa.com/HRService/api/Employee/GetAllEmployees?PageSize=100&PageNumber=1&Search=${Search}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      return data.result;
    } catch (e) {
      console.log({ errEmployees: e.response.data || e });
      return [];
    }
  },

  // Create table data POST method
  async createCostService(formData) {
    try {
      let { data } = await route.post("/CostCenter", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log({ createCostService: data });

      return data;
    } catch (e) {
      console.log({ err: e.response.data || e });
    }
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
    try {
      let { data } = await route.get(
        `/CostCenter/all?Search=&CostClassID=2&PageSize=${PageSize}&PageNumber=${PageNumber}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log({ getCostServices: data });

      return data;
    } catch (err) {
      console.log({ getCostError: err.response.data || err });
    }
  },

  //Get single cost service
  async getCostService(id = 8) {
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

export default CostCenterService;
