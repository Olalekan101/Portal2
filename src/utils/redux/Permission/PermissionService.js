import { api } from "../../api";

const permission = () => {
    const identityService = process.env.REACT_APP_BACKEND_IDENTITY_URL;
    const ind_api = api(identityService);


    return {
        GetAllAppPermissions: function () {
            return  ind_api.get(`/Permission`);
        },
        GetAllUsersPermissions: function (data) {
            const { filter, sort, pageSize, currentPage } = data;
            return ind_api.get(`/UserPermission?PageSize=${pageSize}&CurrentPage=${currentPage}&FilterBy=${filter}&SortBy=${sort}`);
        },
        GetCurrentUserPermissions: function () {
            return  ind_api.get(`/UserPermission/details`);
        },
        GetUserPermissionById: function (userId) {
            return ind_api.get(`/UserPermission/${userId}`);
        },
        UpdateStaffPermissions: function (data) {
            return ind_api.post(`/UserPermission/add`, data);
        },
    };
};

export const PermissionService = {
    permission,
};
