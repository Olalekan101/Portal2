import React, { useEffect, useState } from "react";
import DashboardStyle from "../../../../dashboard/Styles/Dashboard.module.css";
import PageStyle from "../../../Components/Layout/PageLayout";
import {
  ActionButtons,
  CTAButtons,
  SupportButtons,
} from "../../../../global/components/Buttons/buttons";
import Table from "../../../Components/Table/Table";
import { SearchFilter, FilterButton } from "../../../Components/Search/Search";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  FormatDateTime,
  GetSearchParams,
} from "../../../../../utils/functions/ResourceFunctions";
import { TableActions } from "../../../Components/Misc/Actions";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import {
  FormInput,
  FormSelect,
  FormTemplate,
  FormTextArea,
} from "../../../Components/Forms/InputTemplate";
import { FormProvider, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import {
  CreateConsummableCategories,
  CreateConsummableClass,
  CreateConsummableSubClass,
  GetCategories,
  GetConsummableClass,
  UpdateConsummableCategories,
  UpdateConsummableClass,
  UpdateConsummableSubClass,
} from "../../../../../utils/redux/ConsummableSetUp/ConsummableSetUpSlice";
function Categories() {
  const { category, isLoading } = useSelector((x) => x?.consummableSetUp);

  const [openModal, setOpenModal] = useState(false);
  const [filterBy] = useState(0);
  const [sort] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [find, setFind] = useState(false);
  // const [pageSize, setPageSize] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);

  console.log({ category });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GetCategories({
        filter: filterBy,
        pageSize: 10000,
        currentPage: 1,
        searchText: searchText,
        sort,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [find]);
  const actionButton = (
    <>
      <CTAButtons
        onClick={() => {
          navigate("?modal_type=categories");
          setOpenModal(!openModal);
        }}
      >
        Add New Setup
      </CTAButtons>
    </>
  );

  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);
  return (
    <PageStyle
      title={"Consumable Categories"}
      hasBack={false}
      action={actionButton}
      isMain={true}
    >
      <div className={DashboardStyle.dashboard_filter}>
        <SearchFilter text={(searchText) => setSearchText(searchText)} />

        <FilterButton onClick={() => setFind(!find)} name="" />
      </div>
      <div className={DashboardStyle.dashboard_table_holder}>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Class</th>
              <th>Sub Class</th>
              {/* <th>Component</th> */}
              <th>Date</th>
              {/* <th>Status</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category?.result?.map((acq, index) => (
              <AcqTable
                {...acq}
                isLoading={isLoading}
                isOpen={openModal}
                setIsOpen={setOpenModal}
                key={index * Math.random()}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <AppModalTemplate
        padding={"0px"}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
        {getURLData("modal_type") === "class" && (
          <CreateClassActions
            category={category}
            isOpen={openModal}
            setIsOpen={setOpenModal}
            isLoading={isLoading}
          />
        )}
        {getURLData("modal_type") === "sub_class" && (
          <CreateSubClassActions
            category={category}
            isOpen={openModal}
            setIsOpen={setOpenModal}
            isLoading={isLoading}
          />
        )}
        {getURLData("modal_type") === "categories" && (
          <CreateCategoryActions
            category={category}
            isOpen={openModal}
            setIsOpen={setOpenModal}
            isLoading={isLoading}
          />
        )}
      </AppModalTemplate>
      {/* <Pagination
        last_page={asset_allocation?.totalPages}
        present_page={asset_allocation?.currentPage}
        totalRows={asset_allocation?.totalRows}
        pageSize={pageSize}
        setPageSize={(page) => setPageSize(page)}
        click={(page) => setCurrentPage(page)}
      /> */}
    </PageStyle>
  );
}

export default Categories;

function AcqTable({
  id,
  createdDate,
  status,
  categoryClass,
  assetComponent,
  categorySubClass,
  description,
  categoryName,
  isOpen,
  setIsOpen,
  isLoading,
}) {
  const navigate = useNavigate();
  if (isLoading === true) {
    return <p>Loading...</p>;
  }
  return (
    <tr key={id * Math.random()}>
      <td>{id}</td>
      <td>{categoryName}</td>
      <td>
        {categoryClass?.map((x) => {
          return `${x}, `;
        })}
      </td>
      <td>
        {categorySubClass?.map((x) => {
          return `${x}, `;
        })}
      </td>
      <td>{FormatDateTime(createdDate, "ll")}</td>

      <td>
        <TableActions url={`${id}/view?name=${categoryName}`}>
          {[
            {
              name: "Create Class",
              action: () => {
                setIsOpen(!isOpen);
                navigate(`?modal_type=class&category=${id}`);
              },
            },
            {
              name: "Create Sub Class",
              action: () => {
                setIsOpen(!isOpen);
                navigate(`?modal_type=sub_class&category=${id}`);
              },
            },
          ]}
        </TableActions>
      </td>
    </tr>
  );
}

export function CreateClassActions({ isOpen, setIsOpen, category, isLoading }) {
  const appURL = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  const getURLData = (e) => appURL.get(e);
  // const { isLoading } = useSelector((state) => state?.procurement);
  // console.log(dv);
  const defaultData = {
    categoryId: getURLData("category"),
    name: getURLData("class"),
  };
  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const submit = ({ categoryId, name }) => {
    getURLData("isEdit") === "true"
      ? dispatch(
          UpdateConsummableClass({
            name,
            id: getURLData("classId"),
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            window.location.reload();
          }
        })
      : dispatch(
          CreateConsummableClass({
            consumableCategoryId: categoryId,
            name,
            description: name,
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            setIsOpen(!isOpen);
            dispatch(
              GetCategories({
                pageSize: 100000,
                currentPage: 1,
                sort: 0,
                filter: 0,
              })
            );
          }
        });
  };

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>{getURLData("isEdit") === "true" ? "Update" : "Create"} Class</h4>
        <FiX
          style={{ cursor: "pointer" }}
          size={"1.5rem"}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div className={DashboardStyle.dash_board_home_nav_body}>
        {isLoading && <small>Loading...</small>}
        <div>
          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              <FormSelect
                disabled={getURLData("isEdit") === "true" && "disabled"}
                title={"Categories"}
                camelCase={"categoryId"}
                placeholder={"select"}
                array={category?.result?.map?.((x, index) => (
                  <option key={index} value={+x?.id}>
                    {x?.categoryName}
                  </option>
                ))}
              />
              <FormInput title={"Class"} camelCase={"name"} />
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
                  width={"auto"}
                  isLoading={isLoading}
                  disabled={!isValid}
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

export function CreateSubClassActions({
  isOpen,
  setIsOpen,
  category,
  isLoading,
}) {
  const appURL = new URLSearchParams(window.location.search);
  const getURLData = (e) => appURL.get(e);
  // console.log(dv);
  const defaultData = {
    categoryId: getURLData("category"),
    assetClassId: getURLData("class"),
    name: getURLData("subClass"),
  };
  const dispatch = useDispatch();
  const { assetSetUp, consummableSetUp } = useSelector((state) => state);

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  useEffect(() => {
    dispatch(
      GetConsummableClass({
        pageSize: 100000,
        currentPage: 1,
        sort: 0,
        filter: 0,
        CategoryId: getURLData("category"),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = ({ categoryId, name, assetClassId }) => {
    getURLData("isEdit") === "true"
      ? dispatch(
          UpdateConsummableSubClass({
            name: name,
            id: getURLData("subClassId"),
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            window.location.reload();
          }
        })
      : dispatch(
          CreateConsummableSubClass({
            consumableCategoryId: +categoryId,
            name,
            consumableClassId: +assetClassId,
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            setIsOpen(!isOpen);
            dispatch(
              GetCategories({
                pageSize: 100000,
                currentPage: 1,
                sort: 0,
                filter: 0,
                Name: "",
              })
            );
          }
        });
  };

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>
          {getURLData("isEdit") === "true" ? "Update" : "Create"} Sub Class
        </h4>
        <FiX
          style={{ cursor: "pointer" }}
          size={"1.5rem"}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div className={DashboardStyle.dash_board_home_nav_body}>
        {isLoading && <small>Loading...</small>}
        <div>
          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              <FormSelect
                title={"Categories"}
                camelCase={"categoryId"}
                placeholder={"select"}
                disabled={getURLData("isEdit") === "true" && "disabled"}
                isLoading={consummableSetUp?.isLoadingCategories}
                array={category?.result?.map?.((x, index) => (
                  <option key={index} value={+x?.id}>
                    {x?.categoryName}
                  </option>
                ))}
                moreRegister={{
                  onChange: (e) => {
                    dispatch(
                      GetConsummableClass({
                        pageSize: 100000,
                        currentPage: 1,
                        sort: 0,
                        filter: 0,
                        CategoryId: e.target.value,
                      })
                    );
                    return null;
                  },
                }}
              />
              <FormSelect
                title={"Class"}
                camelCase={`assetClassId`}
                placeholder={"select"}
                disabled={getURLData("isEdit") === "true" && "disabled"}
                isLoading={consummableSetUp?.isLoadingClass}
                array={consummableSetUp?.consummable_class?.responseObject?.map?.(
                  (x, index) => (
                    <option key={index} value={+x?.id}>
                      {x?.name}
                    </option>
                  )
                )}
                moreRegister={{
                  onChange: (e) => {
                    const isFound =
                      assetSetUp?.asset_class?.responseObject?.find(
                        (x) => +e.target.value === +x?.id
                      );

                    return isFound;
                  },
                }}
              />
              <FormInput title={"Sub Class"} camelCase={"name"} />
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
                  width={"auto"}
                  isLoading={isLoading}
                  disabled={!isValid}
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

export function CreateCategoryActions({
  isOpen,
  setIsOpen,
  category,
  isLoading,
}) {
  const dispatch = useDispatch();

  const defaultData = {
    name: GetSearchParams("name"),
    description: GetSearchParams("des"),
  };

  const formMethods = useForm({
    defaultValues: defaultData,
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const submit = (data) => {
    GetSearchParams("isEdit") === "true"
      ? dispatch(
          UpdateConsummableCategories({
            ...data,
            id: +GetSearchParams("id"),
          })
        )?.then((res) => {
          if (res?.payload?.successful === true) {
            window.location.reload();
          }
        })
      : dispatch(CreateConsummableCategories(data))?.then((res) => {
          if (res?.payload?.successful === true) {
            setIsOpen(!isOpen);
            dispatch(
              GetCategories({
                pageSize: 100000,
                currentPage: 1,
                sort: 0,
                filter: 0,
              })
            );
          }
        });
  };

  return (
    <div className={DashboardStyle.dash_board_home_nav}>
      <div className={DashboardStyle.dash_board_home_nav_header}>
        <h4>
          {GetSearchParams("isEdit") === "true" ? "Update" : "Create"} Category
        </h4>
        <FiX
          style={{ cursor: "pointer" }}
          size={"1.5rem"}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div className={DashboardStyle.dash_board_home_nav_body}>
        {isLoading && <small>Loading...</small>}
        <div>
          <FormProvider {...formMethods}>
            <FormTemplate handleSubmit={handleSubmit(submit)}>
              <FormInput
                title={"Categories"}
                camelCase={"name"}
                placeholder={"select"}
              />
              <FormTextArea title={"Description"} camelCase={"description"} />
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
                  isLoading={isLoading}
                  disabled={!isValid}
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
