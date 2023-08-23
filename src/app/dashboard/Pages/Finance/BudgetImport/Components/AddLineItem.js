import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

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

const Button = ({ text, stylebtn = true, settoggle }) => {
  return (
    <button onClick={settoggle}>
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
export default function AddLineItem({ settoggle }) {
  const { handleSubmit, register } = useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

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
  const options = [
    "All",
    "Benefits",
    "Control",
    "Finance",
    "Customer Service",
    "Marketing",
  ];

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };
  return (
    <section className="flex flex-col">
      <div className="flex  justify-between items-center bg-[#305F32] p-4 rounded-md w-full text-white mb-5">
        <div className="">Add Line Item</div>
        <div>
          <AiOutlineClose
            onClick={settoggle}
            className="hover:opacity-50 cursor-pointer text-xl"
          />
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="flex gap-4 w-full">
            {/* section one */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col">
                <div className="text-primary/50 text-sm">Serial No</div>
                <input
                  placeholder="020"
                  {...register("SerialNo", {
                    required: true,
                  })}
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <div className="text-primary/50 text-sm">Budget Type</div>
                <select
                  className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("BudgetType", {
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

              <div className="flex flex-col">
                <div className="py-2 px-4 border-[1px] border-slate-600/30">
                  Department
                </div>
                <div className="">
                  {options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-2 p-4 border-[1px] border-slate-600/30"
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* section two */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col">
                <div className="text-primary/50 text-sm">Category</div>
                <select
                  className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("ComponentTitle", {
                    required: true,
                  })}
                  placeholder="--"
                >
                  {component_title_options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <div className="text-primary/50 text-sm">Quantity</div>
                <select
                  className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("Category", {
                    required: true,
                  })}
                  placeholder="None"
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
                  Unit Price (N) - Forex Rate
                </div>
                <input
                  {...register("SerialNo", {
                    required: true,
                  })}
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <div className="text-primary/50 text-sm">
                  Total (N) - (Qty*Unit Price)
                </div>
                <input
                  placeholder="999,000,000.00"
                  {...register("SerialNo", {
                    required: true,
                  })}
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <div className="text-primary/50 text-sm">Forex ($)</div>
                <input
                  {...register("SerialNo", {
                    required: true,
                  })}
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            {/* section three */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col">
                <div className="text-primary/50 text-sm">
                  Item Type
                  <span className="text-red-500">*</span>
                </div>
                <select
                  placeholder="--"
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

              <div className="flex w-full mt-4">
                <div className="flex flex-col w-full">
                  <div className="text-primary/50 text-sm">Item</div>
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

              <div className="flex w-full mt-4">
                <div className="flex flex-col w-full">
                  <div className="text-primary/50 text-sm">Description</div>
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

              <div className="flex flex-col">
                <div className="text-primary/50 text-sm">
                  Date (Budget Approved)
                </div>
                <input
                  {...register("SerialNo", {
                    required: true,
                  })}
                  className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full mb-2 mt-4">
            <div className="flex gap-2">
              <Button text={"Cancel"} settoggle={settoggle} />
              <div className="bg-[#305F32] text-white hover:bg-white hover:text-[#305F32] hover:border-[#305F32] py-2 px-4 rounded-md focus:outline-none border-2 w-full group-hover:cursor-pointer">
                <input type="submit" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
