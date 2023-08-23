import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageLayout from "../../../Components/Layout/PageLayout";
import {
  FormInput,
  FormTemplate,
  FormTextArea,
  FormSelect,
  FormSelectAlt,
  FormInputAlt,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import {
  GetCategories,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { BsDash } from "react-icons/bs";
import { useNavigate } from "react-router";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import style from "./styleJS";
import { CreateCostService, GetCostClasses, GetGlobalData } from "../../../../../utils/redux/Finance/CostCenterSlice/CostCenterSlice";
import OptionDropDown from "../../../Components/Misc/OptionDropDown";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";

function CostCenterServiceSetup({editMode}) {
  const { isLoading, CostCenterClass } = useSelector(state=> state.costCenter);
  const defaultData = {
    // setup: [
    //   {
    //     deptID: null,
    //     employeeID: null,
    //     branchID: null,
    //     costClassID: null,
    //     limit: 0,
    //     duration: 1,
    //   },
    // ],
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const dispatch = useDispatch();

  const {
    Employees=[],
    Departments=[],
    Branches=[],
  } = useSelector(state=> state.costCenter.GlobalData);
  
  useEffect(()=>{
    dispatch(GetGlobalData({subGroup:"General"}))
    dispatch(GetCostClasses())
  },[]);

  const [selectedEmployee, setSelectedEmployee] = useState({});
  // const [minimumAmount, setMinimumAmount] = useState("");
  const [optionOpen, setOptionOpen] = useState(false);
  const submit = (data) => {
    data.limit = parseInt(data.limit);
    data.duration = parseInt(data.duration);
    data.branchID = 1 || parseInt(data.branchID);
    data.costClassID = 1 || parseInt(data.costClassID);
    data.departmentID = parseInt(data.departmentID);

    delete data.group;
    delete data.position;

    data.employeeID = selectedEmployee.id;
    console.log({submitData: data})
    dispatch(CreateCostService(data))
    .then(response=> console.log({ServiceSubmitRes: response}))
  };

  return (
    <RouteLayout title={"Finance"}>
      <PageLayout title={"Setup Cost Center Service"} hasBack={true}>
        <FormProvider {...formMethods}>
          <FormTemplate
            className={DashboardStyle.view_app_components}
            handleSubmit={handleSubmit(submit)}
          >
            <section className={DashboardStyle.form_section}>
              <h4 className={style.setup.sectionHeader}>Organizational <br/> Structure</h4>
              <div className={DashboardStyle.inputs_group}>
                <div>
                  <FormSelectAlt
                    title={"Organizational Structure"}
                    camelCase={"group"}
                    placeholder={"Select Structure"}
                    isOptional={false}
                    array={["Employee", "Department", "Branch"].map((item, i)=> <option key={i} value={item.toLowerCase()}>{item}</option>)}
                    moreRegister={{
                      onChange: (e) => { // what to do when selection changes
                        // dispatch(
                        //   GetAssetClass({
                        //     pageSize: 100000,
                        //     currentPage: 1,
                        //     sort: 0,
                        //     filter: 0,
                        //     CategoryId: e.target.value,
                        //   })
                        // );
                        return null;
                      },
                    }}
                  />
                </div>
              </div>
            </section>
            <section className={DashboardStyle.form_section}>
              <h4 className={style.setup.sectionHeader}>Basic <br/>Information</h4>
              <div className={DashboardStyle.inputs_group}>
                <div>
                  <div>
                    <FormInputAlt
                      title={"Employee"}
                      camelCase={"employeeID"}
                      placeholder={"Enter Employee Name"}
                      isOptional={false}
                      defaultValue={""}
                      value={selectedEmployee.accountName}
                      array={[]}
                      onFocus={(e) => { // what to do when selection changes
                        setOptionOpen(true);
                      }}
                      onBlur={()=> setOptionOpen(false)}
                      onChange={(e) => { // what to do when selection changes
                        let val = e.target.value?.trim();
                        // console.log(val)

                        if(val?.length > 0) {
                          setOptionOpen(true);
                          setSelectedEmployee({
                            accountName: val.length? val : "",
  
                          })
                          dispatch(GetGlobalData({val: val, subGroup:"Employees"}))
                        } else {
                          setOptionOpen(false);
                        }

                      }}
                      moreRegister={{
                        onChange: (e) => { // what to do when selection changes
                          setOptionOpen(true);
                          console.log(e.target.value);
                        },
                      }}
                    />
                    {optionOpen &&
                      <OptionDropDown closeDropDown={()=> setOptionOpen(false)} data={Employees} onChoose={(item)=>{ setSelectedEmployee(item); setOptionOpen(false)}} />
                    }
                  </div>

                  <FormInputAlt
                    title={"Position"}
                    camelCase={"position"}
                    placeholder={"Select position"}
                    isOptional={false}
                    value={selectedEmployee.positionCode || ""}
                    array={[]}
                    moreRegister={{
                      onChange: (e) => { // what to do when selection changes
                        // dispatch(
                        //   GetAssetClass({
                        //     pageSize: 100000,
                        //     currentPage: 1,
                        //     sort: 0,
                        //     filter: 0,
                        //     CategoryId: e.target.value,
                        //   })
                        // );
                        return null;
                      },
                    }}
                  />
                </div>

                <div>
                  <FormSelectAlt
                    title={"Department"}
                    camelCase={"departmentID"}
                    placeholder={"Select Department"}
                    isOptional={false}
                    array={Departments.map((item, i)=> <option key={i} value={item.id}>{item.description}</option>)}
                    moreRegister={{
                      onChange: (e) => { // what to do when selection changes
                        // dispatch(
                        //   GetAssetClass({
                        //     pageSize: 100000,
                        //     currentPage: 1,
                        //     sort: 0,
                        //     filter: 0,
                        //     CategoryId: e.target.value,
                        //   })
                        // );
                        return null;
                      },
                    }}
                  />

                  { selectedEmployee.branchId && selectedEmployee.branchName?
                    <FormSelectAlt
                      title={"Branch"}
                      camelCase={"branchID"}
                      placeholder={"Select a Branch"}
                      isOptional={false}
                      array={[{branchName: selectedEmployee.branchName, branchId: selectedEmployee.branchId}].map((item, i)=> <option key={i} value={item.branchId}>{item.branchName}</option>)}
                      moreRegister={{
                        onChange: (e) => { // what to do when selection changes
                          // dispatch(
                          //   GetAssetClass({
                          //     pageSize: 100000,
                          //     currentPage: 1,
                          //     sort: 0,
                          //     filter: 0,
                          //     CategoryId: e.target.value,
                          //   })
                          // );
                          return null;
                        },
                      }}
                    />
                    :
                    <FormSelectAlt
                      title={"Branch"}
                      camelCase={"branchID"}
                      placeholder={"Select a Branch"}
                      isOptional={false}
                      array={Branches.map((item, i)=> <option key={i} value={item.id}>{item.name}</option>)}
                      moreRegister={{
                        onChange: (e) => { // what to do when selection changes
                          // dispatch(
                          //   GetAssetClass({
                          //     pageSize: 100000,
                          //     currentPage: 1,
                          //     sort: 0,
                          //     filter: 0,
                          //     CategoryId: e.target.value,
                          //   })
                          // );
                          return null;
                        },
                      }}
                    />
                  }
                </div>
                
                <div>
                  <FormInputAlt
                    title={"Minimum amount"}
                    camelCase={"limit"}
                    placeholder={"Enter Minimum Amount"}
                    isOptional={false}
                    array={[]}
                    type={'number'}
                    onChange={(e)=>{
                      // let val = e.target.value;
                      // let money = FormatCurrency(val);
                      // setMinimumAmount(money)
                    }}
                    moreRegister={{
                      onChange: (e) => { // what to do when selection changes
                        // dispatch(
                        //   GetAssetClass({
                        //     pageSize: 100000,
                        //     currentPage: 1,
                        //     sort: 0,
                        //     filter: 0,
                        //     CategoryId: e.target.value,
                        //   })
                        // );
                        return null;
                      },
                    }}
                  />

                  <FormSelectAlt
                    title={"Class"}
                    camelCase={"costClassID"}
                    placeholder={"Select Class"}
                    isOptional={false}
                    array={(CostCenterClass.pageItems || []).map((item, i)=> <option key={i} value={item.id}>{item.name}</option>)}
                    moreRegister={{
                      onChange: (e) => { // what to do when selection changes
                        // dispatch(
                        //   GetAssetClass({
                        //     pageSize: 100000,
                        //     currentPage: 1,
                        //     sort: 0,
                        //     filter: 0,
                        //     CategoryId: e.target.value,
                        //   })
                        // );
                        return null;
                      },
                    }}
                  />
                </div>

                <div>
                  <FormInputAlt
                    title={"Duration"}
                    camelCase={"duration"}
                    placeholder={"Select Duration"}
                    isOptional={false}
                    type="number"
                    array={[]}
                    moreRegister={{
                      onChange: (e) => { // what to do when selection changes
                        // dispatch(
                        //   GetAssetClass({
                        //     pageSize: 100000,
                        //     currentPage: 1,
                        //     sort: 0,
                        //     filter: 0,
                        //     CategoryId: e.target.value,
                        //   })
                        // );
                        return null;
                      },
                    }}
                  />
                </div>
              </div>
            </section>

            <div className={DashboardStyle.button_cage}>
              <SupportButtons
                onClick={() => reset()}
                width={"auto"}
                className={DashboardStyle?.button_cage_weight}
              >
                Cancel
              </SupportButtons>
              <ActionButtons
                isLoading={isLoading}
                disabled={!isValid}
                width={"auto"}
                className={DashboardStyle?.button_cage_weight}
              >
                Submit
              </ActionButtons>
            </div>
          </FormTemplate>
        </FormProvider>
      </PageLayout>
    </RouteLayout>
  );
}

function RegisterLineItem({ fieldName, asset_class, index, remove, append }) {
  const [isFoundData, setIsFouncData] = useState();
  return (
    <>
      <div style={{ gridTemplateColumns: "1fr" }}>
        <FormSelect
          title={"Class"}
          camelCase={`${fieldName}.classId`}
          placeholder={"select"}
          array={asset_class?.responseObject?.map?.((x, index) => (
            <option key={index} value={+x?.id}>
              {x?.name}
            </option>
          ))}
          moreRegister={{
            onChange: (e) => {
              const isFound = asset_class?.responseObject?.find(
                (x) => +e.target.value === +x?.id
              );

              // dispatch(
              //   GetAssetSubClass({
              //     pageSize: 100000,
              //     currentPage: 1,
              //     sort: 0,
              //     filter: 0,
              //     CategoryId: isFound?.categoryId,
              //     AssetClassId: e.target.value,
              //   })
              // );

              // console.log({ isFound });

              return setIsFouncData(isFound);
            },
            // return console.log({ data });
          }}
        />
      </div>
      <div>
        <FormSelect
          title={"Sub Class"}
          camelCase={`${fieldName}.classSubClassId`}
          placeholder={"select"}
          array={isFoundData?.subClasses?.map?.((x, index) => (
            <option key={index} value={+x?.id}>
              {x?.name}
            </option>
          ))}
        />

        <FormInput
          title={"Asset Name"}
          camelCase={`${fieldName}.assetName`}
          placeholder={"select"}
          type="text"
        />
      </div>
      <div>
        <FormTextArea
          title={"Asset Description"}
          camelCase={`${fieldName}.assetDescription`}
          placeholder={"select"}
          type="textbox"
          rowsLines={4}
        />
        <FormInput
          title={"Asset Brand"}
          camelCase={`${fieldName}.assetBrand`}
          placeholder={"select"}
          type="text"
        />
      </div>
      {index !== 0 ? (
        <div
          style={{
            color: "#E61B00",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: "5px",
            marginTop: "1rem",
          }}
          onClick={() => remove?.(index)}
        >
          <BsDash />

          <p>Remove Setup</p>
        </div>
      ) : (
        <div
          style={{
            color: "var(--primary-color)",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: "5px",
            marginTop: "1rem",
          }}
          onClick={() => append?.({})}
        >
          <FiPlus />
          <p>Add Another</p>
        </div>
      )}
    </>
  );
}

export default CostCenterServiceSetup;


