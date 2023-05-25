import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Room = {
  roomName: string;
  roomId: string;
}

export type RoomName = {
  playerId: string
  roomName: string
}

export type PlayerId = {
  playerId: string;
}

export type RoomResponse = {
  roomId: string;
  roomName: string;
  players: Array<PlayerId>;
}

export type CreateRoomResponse = {
  roomId: string;
  roomName: string,
  players: Array<PlayerId>
}

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (build) => ({
    getRooms: build.query<Array<Room>, string>({
      query: () => ({
        url: "rooms",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    }),
    addRoom: build.mutation<RoomResponse, RoomName>({
      query: (room) => ({
        url: "rooms",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: room
      })
    })
  })
});

export const { useGetRoomsQuery, useAddRoomMutation } = roomsApi;
