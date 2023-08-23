import React from 'react';
import RouteLayout from "../../Components/Layout/RouteLayout";
import PageStyle from "../../Components/Layout/PageLayout";
import RptStyle from "./Style/Reports.module.css";
import {ActionButtons, SupportButtons} from "../../../global/components/Buttons/buttons";
import {useForm} from "react-hook-form";
// import ReportFormatSelect from "../../Components/Forms/ReportFormatSelect";
// import DeleteSetupModal from "../../Components/Modals/Report/DeleteSetupModal";
import {useDispatch} from "react-redux";
import {AddReport} from "../../../../utils/redux/Report/ReportSlice";
import {useNavigate} from "react-router";

const Required = ()=>(
    <span className="color-red">*</span>
)

export default function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (values) => {
        const valueFormatted = {...values};
        valueFormatted.parameters = valueFormatted.parameters.split(',').map(a=>a.trim())
        valueFormatted.recipients = valueFormatted.recipients.split(',').map(a=>a.trim())
        valueFormatted.values = valueFormatted.values.split(',').map(a=>a.trim())
        valueFormatted.action = parseInt(valueFormatted.action);
        valueFormatted.executionTime = parseInt(valueFormatted.executionTime);
        dispatch(AddReport(valueFormatted)).then(res=>{
            if(res.type === "reports/AddReport/fulfilled"){
                navigate('../');
            }
            return res
        })
    }

    const { handleSubmit, setValue, register } = useForm({
        defaultValues: {
            reportName: "",
            reportFileName: "",
            executionTime: "",
            action: "",
            recipients: "",
            parameters: "",
            values: "",
        }
    });
    return (
        <RouteLayout>
            <PageStyle>
                <div className={`${RptStyle.head} ${RptStyle.head_underline}`}>
                    <div>
                        <div className={RptStyle.head_text}>
                            Report Configuration Details
                        </div>
                        <div className={RptStyle.head_text_sub}>
                            Setup reporting framework here.
                        </div>
                    </div>
                </div>
                <div className={`${RptStyle.add}`}>
                    <div className={RptStyle.add_head}>
                        <h4>Setup information</h4>
                        <div>This allows for a report to be setup</div>
                    </div>
                    <div className={RptStyle.add_form}>
                        <div className="form__row">
                            <div className="form__group">
                                <label htmlFor="report-name" className="form__label">
                                    Report Name <Required />
                                </label>
                                <input
                                    id="report-name"
                                    type="text"
                                    className="form__input"
                                    placeholder="Enter Report Name"
                                    {...register("reportName")}
                                />
                            </div>
                            <div className="form__group">
                                <label htmlFor="report-filename" className="form__label">
                                    Report File Name <Required />
                                </label>
                                <input
                                    id="report-filename"
                                    type="text"
                                    className="form__input"
                                    placeholder="Enter a name for the report file"
                                    {...register("reportFileName")}
                                />
                            </div>
                        </div>
                        <div className="form__row">
                            <div className="form__group">
                                <label htmlFor="report-schedule" className="form__label">
                                    Report Schedule
                                </label>
                                <select id="report-schedule" defaultValue="" className="form__select"
                                        {...register("executionTime")}>
                                    <option value="" disabled>Select Report Schedule</option>
                                    <option value="0">Daily</option>
                                    <option value="1">Weekly</option>
                                    <option value="2">Monthly</option>
                                    <option value="3">Yearly</option>
                                </select>
                            </div>
                            <div className="form__group">
                                <label htmlFor="action" className="form__label">
                                    Action <Required />
                                </label>
                                <select id="actions" defaultValue="" className="form__select"
                                        {...register("action")}>
                                    <option value="" disabled>Select Report Action</option>
                                    <option value="1">Start Process</option>
                                    <option value="2">Stop Process</option>
                                    <option value="3">Run Now</option>
                                </select>
                            </div>
                        </div>
                        <div className="form__row">
                            <div className="form__group">
                                <label htmlFor="recipients" className="form__label">
                                    Recipients <Required />
                                </label>
                                <input
                                    id="recipients"
                                    type="text"
                                    className="form__input"
                                    placeholder="Enter Email Address seperated by commas"
                                    {...register("recipients")}
                                />
                            </div>
                            <div className="form__group">
                                <label htmlFor="parameter" className="form__label">
                                    Parameters <Required />
                                </label>
                                <input
                                    id="recipients"
                                    type="text"
                                    className="form__input"
                                    placeholder="Enter parameters seperated by commas"
                                    {...register("parameters")}
                                />
                            </div>
                        </div>
                        <div className="form__row">
                            <div className="form__group">
                                <label htmlFor="values" className="form__label">
                                    Values <Required />
                                </label>
                                <input
                                    id="values"
                                    type="text"
                                    className="form__input"
                                    placeholder="Enter values seperated by commas"
                                    {...register("values")}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className={`form__group ${RptStyle.add_action_btns}`}>
                    <SupportButtons onClick={()=>navigate('../')}>
                        Cancel
                    </SupportButtons>
                    <ActionButtons onClick={handleSubmit(onSubmit)}>
                        Save
                    </ActionButtons>
                </div>

            </PageStyle>
        </RouteLayout>
    )
}