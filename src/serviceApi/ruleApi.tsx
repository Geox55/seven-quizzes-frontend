import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type RuleType = {
  rules: string;
}

export const ruleApi = createApi({
  reducerPath: "ruleApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  endpoints: (build) => ({
    getRules: build.query<RuleType, string>({
      query: () => ({
        url: "rules",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    })
  })
});

export const { useGetRulesQuery } = ruleApi;
