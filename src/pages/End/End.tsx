import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import QuizzesLayout from "../../layouts/QuizzesLayout/QuizzesLayout";
import "./End.css";
import { useStoreDispatch } from "../../store/store";

import { END_GAME } from "../../reducers/gameReducer";
import { NEW_GAME_IN_NEW_ROOM } from "../../reducers/roomReducer";

function End(): JSX.Element {
  const dispatch = useStoreDispatch();
  const [points, setPoints] = useState("");
  const endGame = () => {
    dispatch(END_GAME());
    dispatch(NEW_GAME_IN_NEW_ROOM());
  };
  useEffect(() => {
    const point = localStorage.getItem("point");
    if (point) {
      setPoints(point);
    }
  }, []);

  return (
    <QuizzesLayout>
      <Card className={"card_end"} bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <>
          <h3 className={"card_game__finish_text"}>Game finished</h3>
          <p className={"card_end__points_text"}>Score: ${points} points</p>
          <Link className={"card_end__button_play_again"} to="/" onClick={endGame}> Play again </Link>
        </>
      </Card>
    </QuizzesLayout>
  );
}

export default End;
