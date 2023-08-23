/* eslint-disable react/jsx-no-undef */
import RouteLayout from "../../../../Components/Layout/RouteLayout";
import PageLayout from "../../../../Components/Layout/PageLayout";
import { useNavigate } from "react-router";
import axios from "axios";
import { GetAllEmployees } from "../../../../../../utils/redux/HR/HRSlice";
import {
  CreatePaymentSetup,
  GetAllDept,
} from "../../../../../../utils/redux/Finance/PaymentSetupSlice/PaymentSetupSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../../../../../../utils/api";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
  { value: "option5", label: "Option 5" },
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
// console.log(await getAllDepts());

export default function PaymentSetupHOD() {
  const textInputStyle =
    "block w-full px-4 py-2 rounded border focus:border-blue-500 focus:outline-none";
  const dispatch = useDispatch();
  const { handleSubmit, register, control, reset } = useForm();
  const [data, setdata] = useState("");
  const postdata = JSON.stringify(data);
  // console.log(JSON.stringify(data));
  function savePaymentSetup(data) {
    setdata(data);
    dispatch(CreatePaymentSetup(postdata)).then((response) => {
      console.log({ response });
    });
    reset();
  }
  // useEffect(() => {
  //   dispatch(GetAllDept()).then((response) => {
  //     console.log({ ...response.payload });
  //     // reset()
  //   });
  // });
  return (
    <RouteLayout>
      <PageLayout hasBack={true}>
        <section className="bg-white p-6">
          <div className="text-[32px] mb-2 text-primary">Payment Setup</div>
          <hr className="border-[1px] text-[#D9DFE9]" />
          <div className="flex mt-6 mb-12 justify-between">
            <div className="font-bold w-[40%]">Employee's Details</div>
            <form className="w-full" onSubmit={handleSubmit(savePaymentSetup)}>
              <div className="flex gap-4 w-full">
                <div className={`flex flex-col gap-4 w-full`}>
                  <input
                    {...register("departmentID")}
                    placeholder="Department ID"
                    className={`${textInputStyle}`}
                  />
                  <input
                    {...register("employeeID")}
                    placeholder="Employee ID"
                    className={`${textInputStyle}`}
                  />

                  <input
                    {...register("minAmount")}
                    placeholder="Minimum Amount"
                    className={`${textInputStyle}`}
                  />
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <input
                    {...register("maxAmount")}
                    placeholder="Maximum Amount"
                    type="text"
                    className={`${textInputStyle}`}
                  />
                  <input
                    {...register("roleID")}
                    placeholder="Role ID"
                    className={`${textInputStyle}`}
                  />
                  <input
                    {...register("paymentTypeID")}
                    placeholder="Payment Tpye ID"
                    className={`${textInputStyle}`}
                  />
                </div>
              </div>
              <div className="flex justify-end w-full mt-10">
                <div className="flex gap-2">
                  {/* <Button /> */}
                  <Button text={"Submit"} stylebtn={false} />
                </div>
              </div>
            </form>
          </div>
        </section>
      </PageLayout>
    </RouteLayout>
  );
}

//  <Controller
//    name="department"
//    control={control}
//    defaultValue=""
//    rules={{ required: true }}
//    render={({ field }) => (
//      <select {...field}>
//        <option value="" disabled>
//          Department
//        </option>
//        {options.map((option) => (
//          <option key={option.value} value={option.value}>
//            {option.label}
//          </option>
//        ))}
//      </select>
//    )}
//  />;
