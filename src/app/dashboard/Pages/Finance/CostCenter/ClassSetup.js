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
  CreateAssetRegister,
  GetAssetClass,
  GetCategories,
} from "../../../../../utils/redux/AssetsSetUp/AssetSetUpSlice";
import { BsDash } from "react-icons/bs";
import { useNavigate } from "react-router";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import style from "./styleJS";
import { CreateCostClass } from "../../../../../utils/redux/Finance/CostCenterSlice/CostCenterSlice";

function CostCenterClassSetup() {
  const navigate = useNavigate();
  const defaultData = {
    assetSetups: [
      {
        assetDescription: "",
        assetName: "",
        classId: "",
        classSubClassId: "",
        nonentity: "",
      },
    ],
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

  const feildArray = useFieldArray({
    control: formMethods.control,
    name: "classSetups",
  });
  const { fields, append, remove } = feildArray;
  const dispatch = useDispatch();
  const { category, asset_class, isLoading } = useSelector(
    (state) => state?.assetSetUp
  );

  useEffect(() => {
    // dispatch(
      
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveClass(data){
    dispatch(CreateCostClass(data))
    .then((response)=>{
      console.log({response})
      reset()
    })
  } 

  return (
    <RouteLayout title={"Finance"}>
      <PageLayout title={"Setup Class"} hasBack={true}>
        <FormProvider {...formMethods} {...feildArray}>
          <FormTemplate
            className={DashboardStyle.view_app_components}
            handleSubmit={handleSubmit(saveClass)}
          >
            <section className={DashboardStyle.form_section}>
              <h4 className={style.setup.sectionHeader}>Basic <br/> Information</h4>
              <div className={DashboardStyle.inputs_group}>
                <div>
                  <FormInputAlt
                    title={"Class name"}
                    camelCase={"costClassName"}
                    placeholder={"Enter Class name"}
                    isOptional={false}
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
                // isLoading={isLoading}
                // disabled={!isValid}
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

export default CostCenterClassSetup;


