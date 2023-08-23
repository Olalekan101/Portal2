import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import PageStyle from "../../Components/Layout/PageLayout";
import RouteLayout from "../../Components/Layout/RouteLayout";
import RptStyle from "./Style/Reports.module.css";
import {CTAButtons, CTAButtonsAlt} from "../../../global/components/Buttons/buttons";
import {URL} from "../../../../utils/routes";
import Table from '../../Components/Table/Table';
import Pagination from "../../Components/Pagination/Pagination";
import {TableActions} from "../../Components/Misc/Actions";
import ReportProcessModal from "../../Components/Modals/Report/ReportProcessModal";
import DeleteSetupModal from "../../Components/Modals/Report/DeleteSetupModal";
import {useDispatch, useSelector} from "react-redux";
import {GetReports, TriggerReport} from "../../../../utils/redux/Report/ReportSlice";

const reportConfig = [
    {
        id: 1,
        nameOfReport: "Vendor Onboarding Report",
        storeFunction: "Registered Vendor",
        parameter: ['Creation date', 'Status', 'Vendor name'],
        schedule: 'weekly',
        reportFormat: ['PDF', 'Excel'],
        status: 'Running'
    },
    {
        id: 2,
        nameOfReport: "Vendor Appraisal Report",
        storeFunction: "Asset Management",
        parameter: ['Date', 'Status',],
        schedule: 'Monthly',
        reportFormat: ['Excel'],
        status: 'Running'
    },
    {
        id: 3,
        nameOfReport: "Vendor Onboarding Report",
        storeFunction: "Fleet Management",
        parameter: ['Date', 'Status'],
        schedule: 'Weekly',
        reportFormat: ['PDF', 'Excel'],
        status: 'Stopped'
    },
    {
        id: 4,
        nameOfReport: "Vendor Appraisal Report",
        storeFunction: "Asset Procurement",
        parameter: ['Date', 'Status'],
        schedule: 'Monthly',
        reportFormat: ['Excel'],
        status: 'Running'
    },
]

export default function ReportConfiguration(){
    const dispatch = useDispatch();
    const { reports } = useSelector((state) => state?.report);
    const [currentReport, setCurrentReport] = useState({});
    const navigate = useNavigate();
    const [showDeleteSetupModal, setShowDeleteSetupModal] = useState(false);
    const [startProcessModal, setStartProcessModal] = useState(false);
    const [stopProcessModal, setStopProcessModal] = useState(false);
    const [runProcessModal, setRunProcessModal] = useState(false);


    const startCurrentProcess = ()=>{}
    const stopCurrentProcess = ()=>{}

    const runCurrentProcess = ()=>{
        console.log('the report to be triggered na ', currentReport);
        dispatch(TriggerReport(currentReport)).then(res => {
                setRunProcessModal(false);
            }
        );

    }


    useEffect(()=>{
        dispatch(GetReports());
    }, [])

    return (
        <RouteLayout title="Reports / Reports Configuration">
            <DeleteSetupModal isOpen={showDeleteSetupModal} handleClose={()=>setShowDeleteSetupModal(false)}/>
            <ReportProcessModal
                headText={"Do you want to start the process?"}
                isOpen={startProcessModal}
                handleClose={()=>setStartProcessModal(false)}
                successBtnText={"Yes, Start"}
                onSuccess={startCurrentProcess}
            />
            <ReportProcessModal
                headText={"Do you want to stop the process?"}
                isOpen={stopProcessModal}
                handleClose={()=>setStopProcessModal(false)}
                successBtnText={"Yes, Stop"}
                onSuccess={stopCurrentProcess}
            />
            <ReportProcessModal
                headText={"Do you want to run now?"}
                isOpen={runProcessModal}
                handleClose={()=>setRunProcessModal(false)}
                successBtnText={"Yes, Run"}
                handleSuccess={runCurrentProcess}
            />
            <div className={RptStyle.head}>
                <div className={RptStyle.head_text}>
                    Reports
                </div>
                <div className={RptStyle.head_btns}>
                    <CTAButtonsAlt onClick={()=>navigate(`${URL.Dashboard}/${URL.Settings}/${URL.Permissions}/${URL.Create_Staff}`)}>
                        Staff
                    </CTAButtonsAlt>
                    <CTAButtons onClick={() => navigate('add')}>
                        Configuration
                    </CTAButtons>
                </div>
            </div>
            <PageStyle>
                <div>
                    <Table>
                        <thead>
                            <th>#</th>
                            <th>Report Name</th>
                            <th>Report File Name</th>
                            <th>Recipients</th>
                            <th>Information Schedule</th>
                            <th>Execution Time</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                        {reports && reports.result && reports.result.map((config, index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{config.reportName}</td>
                                <td>{config.reportFileName}</td>
                                <td>{config.recipients}</td>
                                <td>{config.parameter}</td>
                                <td>{config.executionTime}</td>
                                {/*
                                <td>
                                    <span
                                        style={{
                                        textAlign: "center",
                                        padding: "3px 8px",
                                        borderRadius: "1rem",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        backgroundColor:
                                            config.status === "Running"
                                                ? "#CBFFAE"
                                                    : config.status === "Stopped"
                                                        ? "#FCEBEC"
                                                        : "",
                                        color:
                                            config.status === "Running"
                                                ? "#067306"
                                                    : config.status === "Stopped"
                                                        ? "#9E0038"
                                                        : "",
                                    }}
                                        >
                                        {" "}
                                        {config.status}
                                    </span>
                                </td>
                                */}
                                <td>
                                    <TableActions url={``}>
                                        {[
                                            {
                                                name: "Edit",
                                                action: () => {navigate(`edit/${config.id}`)},
                                            },
                                            {
                                                name: "Run Now",
                                                action: () => {
                                                    setCurrentReport(config)
                                                    setRunProcessModal(true);
                                                                                                    },
                                            },
                                        ]}
                                    </TableActions>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </Table>
                    <Pagination />
                </div>
            </PageStyle>
        </RouteLayout>
    )
}