import { api } from "../../../api";

const root = process.env.REACT_APP_BACKEND_FINANCE_URL;
const route = api(root);
const token = JSON.parse(localStorage.getItem("user_data"))?.userToken;

const AssetNBVService = {
  async getAssets({ search, startDate, endDate }) {
    try {
      let { data } = await route.get(
        `/AssetDepreciationNBV/AsssetDepreciationNBVDashboardQuery`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // console.log({ getAssets: data });

      return data;
    } catch (e) {
      console.log("error", e);
    }
  },
};

export default AssetNBVService;
