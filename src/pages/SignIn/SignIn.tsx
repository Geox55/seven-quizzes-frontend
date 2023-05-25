import React, { useState } from "react";
import { Card } from "antd";
import { Link, Navigate } from "react-router-dom";
import QuizzesLayout from "../../layouts/QuizzesLayout/QuizzesLayout";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { useDispatch } from "react-redux";
import { SET_ERROR, UPDATE_AUTH } from "../../reducers/authReducer";
import { useLoginMutation } from "../../serviceApi/authApi";

import "./SignIn.css";

function SignIn(): JSX.Element {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(0);

  const onSubmit = async () => {
    try {
      const data = await login({ email, password }).unwrap();
      localStorage.setItem("token", data.accessToken);
      dispatch(UPDATE_AUTH(true));
      return <Navigate to="/" />;
    } catch (e: any) {
      setError(e.status);
      if (error === 400) {
        dispatch(SET_ERROR("Incorrect data"));
      }
      if (error === 404) {
        dispatch(SET_ERROR("Invalid login or password"));
      }
      if (error === 500) {
        dispatch(SET_ERROR("Server is unavailable"));
      } else {
        dispatch(SET_ERROR("Error"));
      }

      setEmail("");
      setPassword("");
    }
  };
  return (
    <QuizzesLayout>
      <Card className={"card_sign_in sign_in"} bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <form className={"sign_in__form_sign"}>
          <h3 className={"form_sign__title"}>
            Sign in
          </h3>
          <div className={"form_sign__input_block"}>
            <label htmlFor="email" className={"form_sign__email_label"}>Email</label>
            <input type="email"
                   className={`${error !== 0 && (email === "" && password === "") ? "input-error" : ""} form_sign__input_email`}
                   onChange={(event) => {
                     setEmail(event.target.value);
                   }} />
          </div>
          <div className={"form_sign__input_password"}>
            <PasswordInput onChange={(event) => {
              setPassword(event.target.value);
            }} className={`${error !== 0 && (email === "" && password === "") ? "input-error" : ""}`} />
          </div>
          {error === 400 && (email === "" && password === "") && <p className="error-message">Incorrect data</p>}
          {error === 404 && (email === "" && password === "") &&
            <p className="error-message">Invalid login or password</p>}
          {error === 500 && (email === "" && password === "") && <p className="error-message">Server is unavailable</p>}
          {error !== 0 && (email === "" && password === "") && <p className="error-message">Error</p>}
          <Link to={"/"} onClick={onSubmit} className={"form_sign__continue_button"}>Continue</Link>
        </form>
        <p className={"sign_in__register_instead"}>
          Don’t have an account yet?<br />
          <Link to={"/registration"} className={"sign_in__register_instead_link"}>Register instead</Link>
        </p>
      </Card>
    </QuizzesLayout>
  );
}

export default SignIn;
