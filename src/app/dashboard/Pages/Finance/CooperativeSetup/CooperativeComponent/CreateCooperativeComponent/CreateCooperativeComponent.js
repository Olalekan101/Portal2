import RouteLayout from "../../../../../Components/Layout/RouteLayout";
import PageLayout from "../../../../../Components/Layout/PageLayout";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const component_type_options = [
  { value: "Salary", label: "Salary" },
  { value: "Bonus", label: "Bonus" },
  { value: "Cooperative", label: "Cooperative" },
  { value: "PPP", label: "PPP" },
];
const category_options = [
  { value: "Earning", label: "Earning" },
  { value: "Deduction", label: "Deduction" },
];
const subcategory_options = [
  { value: "Statutory", label: "Statutory" },
  { value: "Non-Statutory", label: "Non-Statutory" },
];
const cycle_options = [
  { value: "Daily", label: "Daily" },
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" },
  { value: "Yearly", label: "Yearly" },
];
const component_title_options = [
  { value: "Financial Overview", label: "Financial Overview" },
  { value: "Operational Strategy", label: "Operational Strategy" },
  { value: "Marketing and Sales", label: "Marketing and Sales" },
  { value: "Human Resources Management", label: "Human Resources Management" },
  { value: "Product Development", label: "Product Development" },
  {
    value: "Customer Service and Support",
    label: "Customer Service and Support",
  },
  { value: "Risk and Compliance", label: "Risk and Compliance" },
  {
    value: "Performance Evaluation and Improvement",
    label: "Performance Evaluation and Improvement",
  },
];

const Select = ({ options, value, onChange, title }) => {
  return (
    <div className="flex flex-col">
      <div className="text-primary/50 text-sm">
        {title}
        <span className="text-red-500">*</span>
      </div>
      <select
        className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={onChange}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const Button = ({ text, stylebtn = true }) => {
  return (
    <button>
      <span
        className={` py-2 px-4 rounded-md focus:outline-none border-2 ${
          stylebtn
            ? "bg-white text-[#305F32] border-[#305F32] hover:bg-[#305F32] hover:text-white"
            : "bg-[#305F32] text-white hover:bg-white hover:text-[#305F32] hover:border-[#305F32]"
        }`}
      >
        {text}
      </span>
    </button>
  );
};

export default function CreateCooperativeComponent() {
  const { handleSubmit, register } = useForm();

  const [submitLoading, setSubmitLoading] = useState(false);

  const formSubmit = (data) => {
    setSubmitLoading(!submitLoading);
    axios
      .post(
        "https://bpmapi-dev.nlpcpfa.com/FinanceService/api/CooperativeSetup/CooperativeComponentCommand",
        data
      )
      .then((response) => {
        console.log("API response:", response.data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        // Handle error, show error message, etc.
      });
    setSubmitLoading(submitLoading);
  };
  return (
    <RouteLayout>
      <PageLayout hasBack={true} title={"Setup Cooperative Component"}>
        <section className="bg-white p-6">
          <div>{submitLoading ? "loading..." : ""}</div>
          <div className="flex mt-6 mb-12 justify-between">
            <div className="font-bold w-[40%]">Basic Information</div>
            <div className="flex flex-col gap-4 w-full">
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="flex gap-4 w-full">
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col">
                      <div className="text-primary/50 text-sm">
                        Component Type
                        <span className="text-red-500">*</span>
                      </div>
                      <select
                        className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("ComponentType", {
                          required: true,
                        })}
                      >
                        {component_type_options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <div className="text-primary/50 text-sm">
                        Short Code
                        <span className="text-red-500">*</span>
                      </div>
                      <input
                        placeholder="Short Code"
                        {...register("ShortCode", {
                          required: true,
                        })}
                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-primary/50 text-sm">
                        Sub Category
                        <span className="text-red-500">*</span>
                      </div>
                      <select
                        className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("Subcategory", {
                          required: true,
                        })}
                      >
                        {subcategory_options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col">
                      <div className="text-primary/50 text-sm">
                        Component Title
                        <span className="text-red-500">*</span>
                      </div>
                      <select
                        className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("ComponentTitle", {
                          required: true,
                        })}
                      >
                        {component_title_options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <div className="text-primary/50 text-sm">
                        Category
                        <span className="text-red-500">*</span>
                      </div>
                      <select
                        className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("Category", {
                          required: true,
                        })}
                      >
                        {category_options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-primary/50 text-sm">
                        Cycle
                        <span className="text-red-500">*</span>
                      </div>
                      <select
                        className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("Cycle", {
                          required: true,
                        })}
                      >
                        {cycle_options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex w-full mt-4">
                  <div className="flex flex-col w-full">
                    <div className="text-primary/50 text-sm">
                      Component Description
                      <span className="text-red-500">*</span>
                    </div>
                    <textarea
                      placeholder="Component Description"
                      {...register("ComponentDescription", {
                        required: true,
                      })}
                      cols={6}
                      rows={6}
                      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end w-full mb-2 mt-4">
                  <div className="flex gap-2">
                    <Button text={"Cancel"} />
                    <div className="bg-[#305F32] text-white hover:bg-white hover:text-[#305F32] hover:border-[#305F32] py-2 px-4 rounded-md focus:outline-none border-2 w-fit group-hover:cursor-pointer">
                      <input type="submit" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </PageLayout>
    </RouteLayout>
  );
}
