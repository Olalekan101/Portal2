import RouteLayout from "../../../Components/Layout/RouteLayout";
import PageLayout from "../../../Components/Layout/PageLayout";
import { CTAButtons } from "../../../../global/components/Buttons/buttons";
import { useNavigate } from "react-router";
import { FormatCurrency } from "../../../../../utils/functions/FormatCurrency";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRef, useState, useEffect, lazy } from "react";
import { AiOutlineCloudUpload, AiOutlineFile } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import Modal from "../../../Components/Modals/BaseModal";
import { AppModalTemplate } from "../../../Components/Modals/Modals";
import { useDispatch, useSelector } from "react-redux";
import { ImportYearlyBudget } from "../../../../../utils/redux/Finance/BudgetImportSlice/BudgetImportSlice";

const BudgetTable = lazy(() =>
  import("../BudgetImport/Components/BudgetImportTable")
);
const AddLineItem = lazy(() =>
  import("../BudgetImport/Components/AddLineItem")
);

const BudgetCardData = [
  {
    name: "Total Budget",
    cost: FormatCurrency(999000000),
  },
  {
    name: "Disbursed Budget",
    cost: FormatCurrency(999000000),
  },
  {
    name: "Allocated Budget",
    cost: FormatCurrency(999000000),
  },
  {
    name: "Actual Budget",
    cost: FormatCurrency(999000000),
  },
];

export default function BudgetImport() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [value, setValue] = useState(100);
  const [percentage, setPercentage] = useState(100);
  const [showTable, setShowTable] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [toggleactionbtn, setToggleActionBtn] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectFile, setSelectFile] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectFile(selectFile);
    if (selectedFile) {
      uploadFile(selectedFile);
      setSelectedFileName(selectedFile.name);
      // console.log(selectedFile);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    dispatch(ImportYearlyBudget(selectFile)).then((response) => {
      console.log({ response });
    });
  };

  const calculatePercentage = (val) => {
    // Assuming the maximum value of the slider is 100
    const max = 100;
    const calculatedPercentage = (val / max) * 100;
    setPercentage(calculatedPercentage);
  };

  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    calculatePercentage(newValue);
  };

  return (
    <RouteLayout>
      <header className="flex justify-between items-center ">
        <div className="text-3xl font-semibold text-green-900">
          Budget Import
        </div>
        <div className="flex gap-2">
          <CTAButtons
            onClick={() => {
              setShowTable((prev) => (prev = false));
              setToggleActionBtn(!toggleactionbtn);
            }}
          >
            Add Budget
          </CTAButtons>
          <CTAButtons
            onClick={() => {
              setOpenModel((prev) => (prev = true));
            }}
          >
            Add Line
          </CTAButtons>
        </div>
      </header>
      <PageLayout isMain={true}>
        <AppModalTemplate
          isOpen={openModel}
          setIsOpen={setOpenModel}
          width={"50%"}
        >
          <AddLineItem settoggle={setOpenModel} />
        </AppModalTemplate>
        <section>
          <div className="flex justify-between">
            {BudgetCardData.map((data, index) => (
              <div key={index} className="flex flex-col gap-2 p-4 shadow-md">
                <div className="flex justify-between items-center text-sm">
                  <div>{data.name}</div>
                  <BiDotsVerticalRounded />
                </div>
                <div className="text-2xl font-bold">{data.cost}</div>
              </div>
            ))}
          </div>

          <div>
            {showTable ? (
              <BudgetTable />
            ) : (
              <div className="flex flex-col justify-center items-center gap-2 w-full mt-10">
                <div>
                  <div
                    onClick={handleDivClick}
                    onDragOver={(e) => e.preventDefault()}
                    className="p-4 cursor-pointer border-2 border-green-600/30 rounded-md flex w-fit flex-col gap-2 justify-center items-center border-dotted hover:opacity-50"
                  >
                    <AiOutlineCloudUpload className="text-5xl" />
                    <div>Click to upload or drag and drop</div>
                    <div>xlsx or csv (max 800x400px)</div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      accept=".csv, .xlsx"
                    />
                  </div>
                </div>
                {/* uploading file Component */}
                <div className="flex justify-center items-center gap-2">
                  <div className="flex h-full  items-start justify-center gap-4 p-4  border-2 border-green-600/30 rounded-md">
                    <div className=" h-full flex">
                      <AiOutlineFile className="text-xl" />
                    </div>
                    <div>
                      <div className="flex flex-col gap-2 justify-start items-start">
                        <div>File Uploaded Successfully</div>
                        <div>200 kb</div>
                        <div className="flex">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={value}
                            onChange={handleSliderChange}
                            style={{
                              background: `linear-gradient(to right, #10B981 0%, #10B981 ${percentage}%, #D1D5DB ${percentage}%, #D1D5DB 100%)`,
                            }}
                            className="w-64 h-4 rounded-lg appearance-none bg-gray-300 outline-none"
                          />
                          <div className="ml-2 text-sm">
                            {percentage.toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="rounded-full bg-green-500 p-2">
                        <TiTick size={20} color="white" />
                      </div>
                    </div>
                  </div>
                  <div className="border-2 border-green-500/50 p-4 rounded-md hover:opacity-50">
                    <button
                      onClick={() => {
                        setToggleActionBtn(!toggleactionbtn);
                        setShowTable(!showTable);
                      }}
                    >
                      Open File
                    </button>
                  </div>
                </div>
                {/* error component */}
                <div className="flex h-full  items-start justify-center gap-4 p-4  border-2 border-red-600/30 rounded-md">
                  <div className=" h-full flex">
                    <AiOutlineCloudUpload className="text-xl text-red-400" />
                  </div>
                  <div>
                    <div className="flex flex-col gap-2 justify-start items-start text-red-500">
                      <div className="font-bold">
                        Uploaded failed, please try again
                      </div>
                      <div>budget import.xlsx</div>
                      <button className="font-bold">try again</button>
                    </div>
                  </div>
                  <div>
                    <div className="rounded-full bg-red-500 p-2">
                      <MdDeleteOutline size={20} color="white" />
                    </div>
                  </div>
                </div>
                {/* further explaination error component */}
                <div className="flex h-full  items-start justify-center gap-4 p-4  border-2 border-red-600/30 rounded-md">
                  <div>
                    <div className="flex flex-col gap-2 justify-start items-start text-red-500">
                      <div className="font-bold">
                        The uploaded flie has missing fields...
                        <br />
                        Please update or remove the following fields
                      </div>
                      <div>
                        <ul>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            [Category]
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            [Unit Price(Forex Rate)]
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </PageLayout>
    </RouteLayout>
  );
}
