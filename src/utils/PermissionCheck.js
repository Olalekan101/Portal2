import {getMyPermissions} from "./functions/GetMyPermissions";

export default function PermissionCheck  ({permission, children}) {
  return getMyPermissions().includes(permission) ? children : <></>;
}