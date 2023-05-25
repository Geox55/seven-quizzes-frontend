import React, { useEffect, useState } from "react";
import { Button, Card, Layout, Spin } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import QuizzesLayout from "../../layouts/QuizzesLayout/QuizzesLayout";
import { RootState, useStoreDispatch } from "../../store/store";
import {
  ANSWER_QUESTION_ACTION, GET_FIRST_QUESTION_ACTION,
  UPDATE_ANSWER, UPDATE_ANSWERS, UPDATE_CORRECT_ANSWER, UPDATE_CURRENT_QUESTION_ID, UPDATE_NUMBER, UPDATE_TEXT
} from "../../reducers/gameReducer";

import "./Game.css";
import {
  useAnswerQuestionMutation,
  useLazyGetQuestionByIdQuery, useStartGameMutation
} from "../../serviceApi/questionApi";

export type Answer = {
  answerText: string;
  answerId: string;
}

const { Header } = Layout;

const Game = () => {
  const dispatch = useStoreDispatch();
  const [startGame] = useStartGameMutation();

  const answer = useSelector((state: RootState) => state.game.answer);
  const correctAnswer = useSelector((state: RootState) => state.game.correctAnswer);
  const number = useSelector((state: RootState) => state.game.number);
  const point = useSelector((state: RootState) => state.game.point);
  const currentQuestionId = useSelector((state: RootState) => state.game.currentQuestionId);
  const currentQuestion = useSelector((state: RootState) => state.game.currentQuestion);
  const listAnswer = useSelector((state: RootState) => state.game.listAnswer);
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const player = localStorage.getItem("playerId");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [end, setEnd] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(true);

  const [getQuestionById, { isLoading: loadingGetQuestion }] = useLazyGetQuestionByIdQuery();
  const [answerQuestion, { isLoading: loadingAnswerQuestion }] = useAnswerQuestionMutation();

  const sendAnswer = async () => {
    try {
      if (player) {
        const data = await answerQuestion({
          currentRoom,
          currentQuestionId,
          body: { answerId: answer }
        })
          .unwrap();
        dispatch(ANSWER_QUESTION_ACTION(data));
      }
    } catch (e) {
      console.log("ERROR!!!");
    } finally {
      setNext(false);
      setIsClick(!isClick);
      if (number === 4) {
        setEnd(true);
      }
    }
  };

  const nextQuestion = async () => {
    try {
      const data = await getQuestionById({ currentRoom, currentQuestionId }).unwrap();
      dispatch(UPDATE_ANSWERS(data.answersList));
      dispatch(UPDATE_CORRECT_ANSWER(""));
      dispatch(UPDATE_TEXT(data.questionText));
      dispatch(UPDATE_NUMBER());
      setSelectedAnswer("");
    } catch (e) {
      console.log("ERROR!!!");
    } finally {
      setNext(true);
      setIsClick(!isClick);
    }
  };

  const selectAnswer = (answerId: string): void => {
    setSelectedAnswer(answerId);
    console.log(answerId);
    if (correctAnswer !== "") {
      return;
    }
    if (answer !== answerId) {
      dispatch(UPDATE_ANSWER(answerId));
    } else {
      dispatch(UPDATE_ANSWER(""));
    }
  };

  const addClassSelected = (answerId: string): string => {
    if (selectedAnswer === answerId) {
      return "selected_button";
    }
    return "";
  };

  const displayResult = (answerId: string): string => {
    if (answerId === selectedAnswer && selectedAnswer !== correctAnswer) {
      return "button__answer-wrong";
    }
    return "";
  };

  const searchCorrectAnswer = (answerId: string): string => {
    if (answerId === correctAnswer) {
      return "button__answer-correct";
    }
    return "";
  };

  const getFirstQuestion = async () => {
    const result = await getQuestionById({ currentRoom, currentQuestionId }).unwrap();
    dispatch(GET_FIRST_QUESTION_ACTION(result));
  };
  useEffect(() => {
    getFirstQuestion();
  }, []);

  return (
    <QuizzesLayout>
      <Card className={"card_game"} bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        {(loadingAnswerQuestion || loadingGetQuestion) && <Spin />}
        {currentQuestion && <>
          <Header className="card_game__header" style={{
            backgroundColor: "white"
          }}>
            <h1 className="card_game__name">Questions: {number}</h1>
            <p className="card_game__points">Points: {point} </p>
          </Header>
          <p className="card_game__question">{currentQuestion}</p>
          <div className="card_game__list_answers">
            {listAnswer && listAnswer.map((answer) => (
              <Button key={answer.answerId}
                      className={`${displayResult(answer.answerId)} ${searchCorrectAnswer(answer.answerId)} card_game__answer ${addClassSelected(answer.answerId)}`}
                      onClick={() => {
                        selectAnswer(answer.answerId);
                      }}
                      disabled={isClick}>{answer.answerText}</Button>
            ))}
            {next && <Button disabled={selectedAnswer === ""} onClick={sendAnswer}
                             className="card_game__send_answer">Answer</Button>
            }
            {!next && !end &&
              <Button disabled={selectedAnswer === ""} onClick={nextQuestion}
                      className="card_game__send_answer">Next</Button>
            }
            {end &&
              <Link to="/end" onClick={() => {
                localStorage.setItem("answerResponse", JSON.stringify(point));
              }} className="card_game__send_answer">Finish</Link>
            }
          </div>
        </>}
      </Card>
    </QuizzesLayout>
  );
};

export default Game;
