import axios from "axios";
import { api } from "../../../api";

const root = process.env.REACT_APP_BACKEND_FINANCE_URL;
const route = api(root);
const token = JSON.parse(localStorage.getItem("user"))?.userToken;

/**ALL API CALL FUNCTIONS EXPORTED AS AN OBJECT OF METHODS */

const PaymentSetupService = {
  // Create cost class
  async createPaymentSetup(paymentSetupForm) {
    let { data } = await route.post(
      "/PaymentSetup",
      { paymentSetupForm },
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
  async getPaymentSetupComponent({ pageNumber, pageSize }) {
    let { data } = await route.get(
      `/PaymentSetupComponent/all?PageSize=${pageSize}&PageNumber=${pageNumber}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data.responseObject;
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
};

export default PaymentSetupService;
