import React, { useState } from "react";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { useRegistrationMutation } from "../../serviceApi/authApi";
import { UPDATE_AUTH, SET_ERROR } from "../../reducers/authReducer";

import "./SignUp.css";
import QuizzesLayout from "../../layouts/QuizzesLayout/QuizzesLayout";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegistrationMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(0);

  const onSubmit = async () => {
    try {
      if (name !== "" && password !== "" && email !== "") {
        await register({ name, email, password }).unwrap();
        navigate("/sign");
      }
    } catch (e: any) {
      setError(e.status);
      if (error === 400) {
        dispatch(SET_ERROR("Incorrect data"));
      }
      if (error === 500) {
        dispatch(SET_ERROR("Server is unavailable"));
      } else {
        dispatch(SET_ERROR("Error"));
      }
      setName("");
      setEmail("");
      setPassword("");
      navigate("/registration");
    }
  };

  return (
    <QuizzesLayout>
      <Card className={"card_sign_up sign_up"} bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h1 className="sign_up__title">Registration</h1>
        <form className="sign_up__form">
          <div className="form__input_name">
            <label className="name__label" htmlFor="text">Name</label>
            <input className="name__input" type="text" value={name} onChange={(event) => {
              setName(event.target.value);
            }} />
          </div>
          <div className="form__input_email">
            <label className="email__label" htmlFor="email">Email</label>
            <input className="email__input" type="email" value={email} onChange={(event) => {
              setEmail(event.target.value);
            }} />
          </div>
          <div className="form__input_password">
            <PasswordInput value={password} onChange={(event) => {
              setPassword(event.target.value);
            }} />
          </div>
        </form>
        {error === 400 && (name === "" && password === "" && email === "") &&
          <p className="error-message">Incorrect data</p>}
        {error === 500 && (name === "" && password === "" && email === "") &&
          <p className="error-message">Server is unavailable</p>}
        {error !== 0 && (name === "" && password === "" && email === "") && <p className="error-message">Error</p>}
        <Link to="/sign" onClick={onSubmit} >
          <button disabled={name === "" || password === "" || email === ""}
                  className="send-answer">Continue
          </button>
        </Link>
        <p className="card__question">Already have an account? <br />
          <Link to="/sign">Sign in</Link></p>
      </Card>
    </QuizzesLayout>
  );
};

export default SignUp;
