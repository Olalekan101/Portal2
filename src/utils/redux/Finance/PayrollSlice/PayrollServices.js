import { api } from "../../../api";

const root = process.env.REACT_APP_BACKEND_FINANCE_URL;
const route = api(root);
const token = JSON.parse(localStorage.getItem("user_data"))?.userToken;

const PayrollService = {
  async getPayrollData({ search, startDate, endDate }) {
    try {
      let { data } = await route.get(`/Payroll/PayrollPaymentDashboard`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      // console.log({ getPayrollData: data });

      return data;
    } catch (e) {
      console.log("error", e);
    }
  },
  async schedulePayroll(payload) {
    try {
      let { data } = await route.post(
        "/Payroll/SchedulePayrollRunController",
        payload,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log({ schedulePayroll: data });

      return data;
    } catch (e) {
      console.log(e);
    }
  },
};

export default PayrollService;
