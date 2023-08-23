import moment from "moment";
import { useLocation } from "react-router";
export function redirectUser(urlPath, timeout) {
  setTimeout(function () {
    return window.location.replace(urlPath);
  }, timeout);
}

export const strongPasswordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*:])(?=.{8,})"
);

export const FormatDateTime = (value, isDate) => {
  const timeDate = moment(value).format(isDate || "LL");

  return !value ? "" : timeDate;
};

export const removeListData = ({ value, list, setList }) => {
  const v = list?.filter((data, index) => index !== value);
  setList(v);
  return;
};

export const generateFileURL = (file) => {
  if (typeof file === "object") {
    const v = URL?.createObjectURL?.(file);
    return v;
  }

  return null;
};

export const GetSearchParams = (url) => {
  const data = new URLSearchParams(window.location.search).get(url);
  return data;
};

export const GetBaseURL = (url) => {
  const location = useLocation();

  console.log(location);

  return location;
};
