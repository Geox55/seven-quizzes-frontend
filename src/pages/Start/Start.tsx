import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Layout, Spin } from "antd";
import { Link } from "react-router-dom";
import QuizzesLayout from "../../layouts/QuizzesLayout/QuizzesLayout";
import { RootState, useStoreDispatch } from "../../store/store";
import { useStartGameMutation } from "../../serviceApi/questionApi";
import { useGetRulesQuery } from "../../serviceApi/ruleApi";
import { UPDATE_CURRENT_QUESTION_ID } from "../../reducers/gameReducer";

import "./Start.css";

const { Header } = Layout;

function Start() {
  const dispatch = useStoreDispatch();
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const { data, isLoading } = useGetRulesQuery("");

  const [startGame] = useStartGameMutation();

  const getFirstQuestion = async () => {
    const playerId = JSON.stringify(localStorage.getItem("playerId"));
    if (playerId) {
      const data = await startGame({ currentRoom, body: playerId }).unwrap();
      dispatch(UPDATE_CURRENT_QUESTION_ID(data.questionId));
    }
  };

  useEffect(() => {
    getFirstQuestion();
  }, []);
  return (
    <QuizzesLayout>
      <Card className={"card_start"} bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        {isLoading && <Spin />}
        {!isLoading && <>
          <Header className={"card_start__header"} style={{
            backgroundColor: "white"
          }}>
            <h2 className={"card_game__name"}>Game rules</h2>
          </Header>
          <div className={"card_game__rule_describe"}>
            <p className={"card_game__rule_text"}>
              {data && data.rules}
            </p>
          </div>
          <Link className={"card_game__start"} to="/game"> Start </Link>
        </>}
      </Card>
    </QuizzesLayout>
  );
}

export default Start;
