import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Answer } from "../pages/Game/Game";

export type GetQuestionByIdResponse = {
  questionId: string;
  questionText: string;
  answersList: Array<Answer>;
}

export type GetQuestionByIdArg = {
  currentRoom: string;
  currentQuestionId: string;
}

export type AnswerQuestionResponse = {
  correctAnswerId: string;
  questionId: string;
  totalScore: number;
  questionScore: number;
}

export type AnswerId = {
  answerId: string;
}

export type QuestionId = {
  questionId: string;
}

export type AnswerQuestionArg = {
  currentRoom: string;
  currentQuestionId: string;
  body: AnswerId;
}

export type StartGameRequest = {
  currentRoom: string;
  body: string;
}

export const questionsApi = createApi({
  reducerPath: "questionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (build) => ({
    getQuestionById: build.query<GetQuestionByIdResponse, GetQuestionByIdArg>({
      query: ({ currentRoom, currentQuestionId }) => ({
        url: `rooms/${currentRoom}/game/question/${currentQuestionId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    }),
    answerQuestion: build.mutation<AnswerQuestionResponse, AnswerQuestionArg>({
      query: ({ currentRoom, currentQuestionId, body }) => ({
        url: `rooms/${currentRoom}/game/question/${currentQuestionId}/answer`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        method: "POST",
        body
      })
    }),
    startGame: build.mutation<QuestionId, StartGameRequest>({
      query: ({ currentRoom }) => ({
        url: `rooms/${currentRoom}/game/start`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    })
  })
});

export const {
  useLazyGetQuestionByIdQuery,
  useAnswerQuestionMutation,
  useStartGameMutation
} = questionsApi;
