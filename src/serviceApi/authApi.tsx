import { domainName } from "../fetcher/fetcher";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type WhoAmIType = {
  playerId: string;
  name: string;
  roles: Array<string>;
}

export type LoginResponse = {
  accessToken: string;
}

export type LoginRequest = {
  email: string;
  password: string;
}

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
}

export type RegisterResponse = {
  exception: null | number
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: domainName }),
  endpoints: (build) => ({
    whoAmI: build.query<WhoAmIType, string>({
      query: () => ({
        url: "whoami",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "signin",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body
      })
    }),
    registration: build.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "signup",
        method: "POST",
        body
      })
    })
  })
});

export const { useLazyWhoAmIQuery, useLoginMutation, useRegistrationMutation } = authApi;
