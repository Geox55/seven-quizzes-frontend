import React, { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { UPDATE_MODAL } from "../../reducers/modalReducer";

import "./QuizzesHeader.css";
import { RootState, useStoreDispatch } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { UPDATE_AUTH } from "../../reducers/authReducer";
import { useLazyWhoAmIQuery, WhoAmIType } from "../../serviceApi/authApi";
import { useSelector } from "react-redux";

const logo = require("./images/Quizzes-logo.png");
const enter = require("./images/Logout_button.png");
const { Header } = Layout;

function QuizzesHeader() {
  const navigate = useNavigate();
  const dispatch = useStoreDispatch();
  const [whoAmI, { isLoading: loadingWhoIAm }] = useLazyWhoAmIQuery();
  const isAuth = useSelector((state: RootState) => state.authReducer.authorized);
  const [data, setData] = useState<WhoAmIType>();

  const showingModalWindow = () => {
    dispatch(UPDATE_MODAL(true));
  };

  const exit = async () => {
    localStorage.clear();
    navigate("/sign");
    dispatch(UPDATE_AUTH(false));
  };
  const funcWhoIAm = async () => {
    setData(await whoAmI("").unwrap());
    console.log(data);
  };
  useEffect(() => {
    if (isAuth) {
      funcWhoIAm();
    }
  }, []);
  return (
    <Header className={"header"}>
      <a href={"/"}>
        <img src={logo} alt={"Quizzes Logo"} />
      </a>
      <div className={"header__buttons"}>
        <Button className={"header__game-rules"} onClick={showingModalWindow}>
          Game rules
        </Button>
        {data && <Link to="/sign" onClick={exit}>
          <button disabled={false} onChange={exit} className="header__logout">
            <>
              {data.name}
              <img src={enter} alt={"ico_exit"} />
            </>
          </button>
        </Link>}
      </div>
    </Header>
  );
}

export default QuizzesHeader;
