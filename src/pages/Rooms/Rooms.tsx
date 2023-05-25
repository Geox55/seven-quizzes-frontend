import QuizzesLayout from "../../layouts/QuizzesLayout/QuizzesLayout";
import { Card, Spin } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { Header } from "antd/es/layout/layout";
import { RootState, useStoreDispatch } from "../../store/store";
import { useGetRoomsQuery } from "../../serviceApi/roomsApi";
import { UPDATE_CURRENT_ROOM } from "../../reducers/roomReducer";

import "./Rooms.css";

export type RoomType = {
  roomName: string;
  roomId: string;
}

const Rooms = () => {
  const dispatch = useStoreDispatch();
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const { data: listRooms = [], isLoading } = useGetRoomsQuery("");

  const enterRoom = (value: string) => {
    if (currentRoom !== value) {
      dispatch(UPDATE_CURRENT_ROOM(value));
    } else {
      dispatch(UPDATE_CURRENT_ROOM(""));
    }
  };

  return (
    <QuizzesLayout>
      <Card className={"card_rooms"} bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0
      }}>
        <Header className={"card_rooms__header"} style={{
          backgroundColor: "white"
        }}>
          <h2 className={"card_rooms__header_title"}>Game rooms</h2>
        </Header>
        <p className={"card_rooms__describe"}>You can join any room or <Link to={"/create_room"}>create<br />your own
          room</Link></p>
        <div className={"card_rooms__rooms"}>
          {isLoading && <Spin />}
          {!isLoading && listRooms.map((room: RoomType) => (
            <Link key={room.roomId} to={`/start`} className={"card_rooms__room"}
                  onClick={() => {
                    enterRoom(room.roomId);
                  }}>{room.roomName}</Link>
          ))}
        </div>
      </Card>
    </QuizzesLayout>
  );
};

export default Rooms;
