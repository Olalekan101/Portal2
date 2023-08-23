import {GetCurrentUserPermission} from "../redux/Permission/PermissionSlice";
import {GetLocalStorage} from "./GetLocalStorage";
import Logout from "./LogoutFunction";

export function getMyPermissions (){
    let perm = GetLocalStorage('x-u-perm')
    if(perm) return perm
    return [];
}