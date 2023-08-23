/* eslint react-hooks/exhaustive-deps: 0  */
import React, {useEffect, useState} from "react";
import PageLayout from "../../../Components/Layout/PageLayout";
import RouteLayout from "../../../Components/Layout/RouteLayout";
import Select from 'react-select';
import {useForm} from "react-hook-form";
import {ActionButtons, SupportButtons} from "../../../../global/components/Buttons/buttons";
import PermStyle from "./Style/Permission.module.css";
import {CreateInternalUser} from "../../../../../utils/redux/Auth/AuthSlice";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router";
import {
    GetAllAppPermissions,
    GetUserPermission
} from "../../../../../utils/redux/Permission/PermissionSlice";
import {useParams} from "react-router-dom";


export default function CreateStaff({isEdit}) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [appPermissions, setAppPermission] = useState([]);
    const [initialPermissions, setInitialPermissions] = useState([])
    const { allAppPermissionsObj, userPermissionByID } = useSelector((state) => state?.permissions);


    useEffect(()=>{
            dispatch(GetAllAppPermissions())
            if(isEdit){
                dispatch(GetUserPermission(id));
            }
    }, [])
    useEffect(() => {
        const permSelect = allAppPermissionsObj?.map((a) => ({
            value: a.id,
            label: a.name
        }));
        setAppPermission(permSelect);
    },[allAppPermissionsObj])

    useEffect(() => {
        if (userPermissionByID) {
            const initialPerm = userPermissionByID.permsissions?.map(a => ({label: a.permission, value: a.id}));
            setInitialPermissions(initialPerm);
            if (isEdit) {
                reset({
                    username: userPermissionByID.username,
                    email: userPermissionByID.emailAddress,
                    lastName: userPermissionByID.firstName,
                    firstName: userPermissionByID.lastName,
                    permissions: initialPermissions
                });
            }
        }
    }, [userPermissionByID]);

    const { handleSubmit, setValue, register, reset } = useForm({
        defaultValues: {
            username: "",
            email: "",
            lastName: "",
            firstName: "",
            permissions: [],
        },
    })



    const onSubmit = async (values) => {
        const userPayload = {...values};
        userPayload.permissions = userPayload.permissions.map((a)=>a.value)
        dispatch(CreateInternalUser(userPayload)).then((res) => {
            if (res?.payload?.successful === true) {
                navigate(`../`);
            }
        });
    };

    return (
        <RouteLayout title="Settings / Staff Access Setup">
            <PageLayout hasBack={true}>
                <div className={PermStyle.ghead}>
                    <h1 className={PermStyle.ghead_main}>Grant New Staff Permission</h1>
                    <div className={PermStyle.ghead_text}>Add new user to grant access here</div>
                </div>
                <div className="form">
                    <section className={PermStyle.gform}>
                        <h4 className={PermStyle.gform_info}>Setup information</h4>
                        <div className={PermStyle.gform_form_container}>
                            <div className={PermStyle.gform_form}>
                                <div className="form__group">
                                    <label htmlFor="username" className="form__label">Staff Username</label>
                                    <input type="text" required className="form__input"
                                           readOnly={isEdit} {...register("username")}/>
                                </div>
                                <div className="form__group">
                                    <label htmlFor="email-address" className="form__label">Email Address</label>
                                    <input id="email-address" type="email" className="form__input"
                                           readOnly={isEdit}  {...register("email")}/>
                                </div>
                                <div className="form__group">
                                    <label htmlFor="firstName" className="form__label">Firstname</label>
                                    <input type="text" required className="form__input"  {...register("firstName")}/>
                                </div>
                                <div className="form__group">
                                    <label htmlFor="lastName" className="form__label">Lastname</label>
                                    <input type="text" required className="form__input"  {...register("lastName")}/>
                                </div>
                                <div className="form__group">
                                    <label htmlFor="permissions" className="form__label">Permissions</label>
                                    {isEdit && initialPermissions?.length && <Select
                                        options={appPermissions}
                                        defaultValue={initialPermissions}
                                        isMulti={true}
                                        onChange={(value) => setValue('permissions', value)}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                    />}
                                    {!isEdit &&
                                        <Select
                                            options={appPermissions}
                                            isMulti={true}
                                            onChange={(value) => setValue('permissions', value)}
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                        />
                                    }
                                </div>
                                {/*<div className="form__group">*/}
                                {/*    <CTAButtonsAlt onClick={() => {}}>*/}
                                {/*        Add another*/}
                                {/*    </CTAButtonsAlt>*/}
                                {/*</div>*/}
                                <div className={`form__group ${PermStyle.action_btns}`}>
                                    <SupportButtons onClick={() => navigate(-1)}>
                                        Cancel
                                    </SupportButtons>
                                    <ActionButtons onClick={handleSubmit(onSubmit)}>
                                        Save
                                    </ActionButtons>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </PageLayout>
        </RouteLayout>
    );
}