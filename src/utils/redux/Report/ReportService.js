import { api } from "../../api";

const service = process.env.REACT_APP_BACKEND_VENDOR_URL;

export const report_api = api(service);


const reports = () => {
    return {
        getReports: function () {
            return report_api.get(`/report`);
        },
        addReport: function (data) {
            return report_api.post(`/report/add`, data);
        },
        getReportByID: function (data, id) {
            return report_api.post(`/report/${id}`, data);
        },
        updateReport: function (data, id) {
            return report_api.post(`/report/${id}`, data);
        },
        triggerReport: function (data) {
            return report_api.get(`/report/trigger?Id=${data.reportId}&Action=${data.action}`);
        },
    }
}
export const ReportServices = {
    report: reports,
};