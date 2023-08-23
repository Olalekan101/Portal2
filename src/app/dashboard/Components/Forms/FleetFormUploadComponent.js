import React from "react";
import DashboardStyle from "../../Styles/Dashboard.module.css";
import { FiPlus } from "react-icons/fi";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { FormSelect, PerfectFileUpload } from "./InputTemplate";

function FleetFormUploadComponent({
  uploadFile,
  setUploadFile,
  uploadDocument,
  setUploadDocument,
  documentList,
  isOptional,
}) {
  const { getValues, setValue } = useFormContext();

  const filtedDocuments = documentList?.filter?.((xy) => {
    return !uploadDocument?.find?.((yx) => {
      return xy?.value === yx?.fileName || xy?.value === yx?.value;
    });
  });

  return (
    <div className={DashboardStyle.inputs_group_no_grid}>
      <div>
        <FormSelect
          title={
            <>
              File name
              {isOptional === false ? (
                <sup style={{ color: "red" }}>{!isOptional ? "*" : ""}</sup>
              ) : (
                ""
              )}
            </>
          }
          camelCase={"fileName"}
          placeholder={"select"}
          isOptional={true}
          array={filtedDocuments?.map((x) => {
            return <option value={x?.value}>{x?.name}</option>;
          })}
        />

        <PerfectFileUpload
          setFile={setUploadFile}
          file={uploadFile}
          title={""}
          isOptional={false}
          camcelCase={"stuff"}
          handleChange={(cac) => {
            setUploadFile(cac);
          }}
        />
        <div
          style={{
            color: "var(--primary-color)",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: "5px",
          }}
          onClick={() => {
            if (uploadFile && getValues("fileName") !== "") {
              setUploadDocument([
                ...uploadDocument,
                {
                  file: uploadFile,
                  fileName: uploadFile?.name,
                //   fileName: getValues("fileName"),
                  value: documentList.filter(
                    (x) => x?.value === getValues("fileName")
                  )?.[0]?.value,
                },
              ]);

              setUploadFile(null);
              setValue("fileName", "");
            } else toast.error("File Name or File can not be empty");
          }}
        >
          <FiPlus />
          <p>Add Another</p>
        </div>
      </div>
    </div>
  );
}

export default FleetFormUploadComponent;