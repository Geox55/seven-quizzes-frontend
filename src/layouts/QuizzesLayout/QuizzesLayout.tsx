import React from "react";
import { useSelector } from "react-redux";
import { Content } from "antd/es/layout/layout";
import QuizzesHeader from "../../components/Header/QuizzesHeader";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import "./QuizzesLayout.css";
import { RootState } from "../../store/store";

export interface Props {
  children: React.ReactNode
}
function QuizzesLayout ({ children }: Props): JSX.Element {
  const modalOpen = useSelector((store: RootState) => store.modalOpen.openModal);
  return (
    <div className={"layout"}>
      <QuizzesHeader />
      <Content className={"content"}>
        {children}
      </Content>
      {modalOpen && <ModalWindow />}
    </div>
  );
}

export default QuizzesLayout;
