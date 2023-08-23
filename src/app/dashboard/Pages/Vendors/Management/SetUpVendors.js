import React, { useEffect } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import {
  CheckBox,
  FormTemplate,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  AddVendorDepartments,
  GetAllDepartments,
  GetSingleVendor,
} from "../../../../../utils/redux/Vendor/VendorSlice";
// this
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  ActionButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import { CheckMarks } from "./ViewVendors";
import { useParams } from "react-router";

function SetUpVendor(props) {
  const { openModal, setOpenModal, vendor } = props;

  const dispatch = useDispatch();

  const { all_departments, isLoadingAction } = useSelector(
    (state) => state?.vendor
  );

  useEffect(() => {
    dispatch(GetAllDepartments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppModalTemplate
      padding={"0px"}
      width={"700px"}
      isOpen={openModal}
      setIsOpen={setOpenModal}
    >
      <CreateCategoryActions
        vendor={vendor}
        all_departments={all_departments}
        // category={consummableSetUp}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        isLoadingAction={isLoadingAction}
      />
    </AppModalTemplate>
  );
}

export default SetUpVendor;

export function CreateCategoryActions({
  isOpen,
  setIsOpen,
  category,
  isLoadingAction,
  all_departments,
  vendor,
}) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const prefilledManaging = vendor?.managingDepartment?.reduce(
    (lookup, value) => ({
      ...lookup,
      [value?.name]: value?.name,
    }),
    {}
  );

  const prefilledUsers = vendor?.userDepartment?.reduce(
    (lookup, value) => ({
      ...lookup,
      [value?.name]: value?.name,
    }),
    {}
  );

  const defaultData = {
    userDepartments: prefilledUsers,
    managingDepartments: prefilledManaging,
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const {
    handleSubmit,
  } = formMethods;
  // const dispatch = useDispatch();
  const submit = (data) => {
    const appData = {
      vendorId: id,
      userDepartments: Object?.keys(data?.userDepartments)
        ?.filter((x) => data?.userDepartments[x] !== false)
        ?.map((x) => {
          return {
            name: x,
            id: Math.floor(Math.random()),
          };
        }),
      managingDepartments: Object?.keys(data?.managingDepartments)
        ?.filter((x) => data?.managingDepartments[x] !== false)
        ?.map((x) => {
          return {
            name: x,
            id: Math.floor(Math.random()),
          };
        }),
    };

    // dispatch(CreateConsummableAllocation())
    dispatch(AddVendorDepartments(appData))?.then((res) => {
      if (res?.payload?.successful === true) {
        dispatch(GetSingleVendor({ id }));
        setIsOpen(!isOpen);
      }
    });
  };

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>Setup Account</h4>
        <FiX
          style={{ cursor: "pointer" }}
          size={"1.5rem"}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div className={DashboardStyle.dash_board_home_nav_body}>
        <div>
          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              <section className={DashboardStyle.form_sectionc}>
                <div
                  style={{ padding: "1rem" }}
                  className={DashboardStyle.inputs_group_no_grid}
                >
                  <div className={DashboardStyle.inputs_checkbox_groups}>
                    <div>
                      {" "}
                      <CheckMarks name="User Department" isHeading={true} />
                      {all_departments?.responseObject?.pageItems?.map(
                        (state) => (
                          <CheckBox
                            isRequired={false}
                            camelCase={`userDepartments.${state?.name}`}
                            name={`${state?.name}`}
                            value={`${state?.name}`}
                            group={`userDepartments.${state?.name}`}
                          />
                        )
                      )}
                    </div>
                    <div>
                      {" "}
                      <CheckMarks name="Managing Department" isHeading={true} />
                      {all_departments?.responseObject?.pageItems?.map(
                        (state) => (
                          <CheckBox
                            // camelCase={state?.departmentName}
                            // name={state?.departmentName}
                            isRequired={false}
                            camelCase={`managingDepartments.${state?.name}`}
                            name={`${state?.name}`}
                            value={`${state?.name}`}
                            group={`managingDepartments.${state?.name}`}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </section>
              <div
                style={{ marginTop: "1rem" }}
                className={DashboardStyle.button_cage}
              >
                <SupportButtons
                  width={"auto"}
                  onClick={() => setIsOpen(!isOpen)}
                  className={DashboardStyle?.button_cage_weight_without_border}
                >
                  No, Cancel
                </SupportButtons>
                <ActionButtons
                  isLoading={isLoadingAction}
                  // disabled={!isValid}
                  width={"auto"}
                  className={DashboardStyle?.button_cage_weight}
                  bg="var(--primary-color)"
                >
                  Submit
                </ActionButtons>
              </div>
            </FormTemplate>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
