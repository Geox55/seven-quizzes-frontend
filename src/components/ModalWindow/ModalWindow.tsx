import React from "react";
import { Modal, Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState, useStoreDispatch } from "../../store/store";

import "./ModalWindow.css";
import { UPDATE_MODAL } from "../../reducers/modalReducer";
import { useGetRulesQuery } from "../../serviceApi/ruleApi";

const ModalWindow = () => {
  const dispatch = useStoreDispatch();
  const isOpen = useSelector((state: RootState) => state.modalOpen.openModal);
  const { data, isLoading } = useGetRulesQuery("");
  const closeModalWindow = () => {
    dispatch(UPDATE_MODAL(false));
  };
  return (
    <Modal bodyStyle={{
      padding: "75px 85px 120px",
      maxWidth: "1041px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column"
    }} className="game_rules" open={isOpen} width="1041px" centered footer={null} onCancel={closeModalWindow}>
      <header>
        <h1 className="game_rules_title">Game rules</h1>
      </header>
      <div>
        {isLoading && <Spin />}
        {!isLoading && <p className="game_rules_text">{data && data.rules}</p>}
      </div>
    </Modal>
  );
};

export default ModalWindow;
