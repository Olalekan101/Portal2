import React, { useState } from "react";
import AuthLayout from "./components/layout/AuthLayout";
import input from "./components/styles/input.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ActionButtons } from "../../app/global/components/Buttons/buttons";
import { useNavigate } from "react-router-dom";
import { URL } from "../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { AppLogin } from "../../utils/redux/Auth/AuthSlice";
import { useForm } from "react-hook-form";

function Login() {
  const [appSwitch, setAppSwitch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state?.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const submit = (data) => {
    dispatch(AppLogin({ ...data, otp: "" }));
  };
  return (
    <AuthLayout isLogin={true}>
      <p className={input.auth_cta}>
        Don’t have an account?{" "}
        <b onClick={() => navigate(URL.SignUp)}>Sign Up</b>
      </p>
      <div className={input.auth_form}>
        <h2 className={input.auth_h2}>Welcome Back!</h2>
        <p className={input.auth_support_text}>Please enter your details</p>
        <form onSubmit={handleSubmit(submit)}>
          <div className={input.input_container}>
            <label className={input.input_title} htmlFor="username">
              Username or Email Address
            </label>
            <input
              id="username"
              className={input.input_field}
              type="text"
              placeholder={"enter email address"}
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is Required",
                },
              })}
            />
            {errors.username && (
              <small className={input.form__error__message}>
                {errors.username.message}
              </small>
            )}
          </div>
          <div className={input.input_container}>
            <label className={input.input_title} htmlFor="password">
              Password
            </label>
            <div className={input.input_password_cage}>
              <input
                id={"password"}
                className={input.input_field}
                type={!appSwitch ? "password" : "text"}
                placeholder={"enter password"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                })}
              />
              <span onClick={() => setAppSwitch(!appSwitch)}>
                {appSwitch ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {errors.password && (
              <small className={input.form__error__message}>
                {errors.password.message}
              </small>
            )}
          </div>
          {/* <div className={input.auth_checkbox}>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Remember Me</label>
          </div> */}
          <div className={input.auth_action_buttons}>
            <ActionButtons className={input.auth_button}>
              {isLoading ? "Loading..." : "Sign in"}
            </ActionButtons>
            <p
              onClick={() => navigate(URL.ForgotPassword)}
              className={input.auth_support}
            >
              Forgot Password
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
