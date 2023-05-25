import { Card } from "antd";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Header } from "antd/es/layout/layout";
import QuizzesLayout from "../../layouts/QuizzesLayout/QuizzesLayout";
import { useAddRoomMutation } from "../../serviceApi/roomsApi";

import "./CreateRoom.css";

const CreateRoom = () => {
  const [nameRoom, setNameRoom] = useState("");
  const [addRoom] = useAddRoomMutation();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNameRoom(event.target.value);
  };

  const createRoom = async () => {
    const playerId = localStorage.getItem("playerId");
    if (nameRoom && playerId) {
      await addRoom({ playerId, roomName: nameRoom });
    }
  };

  return (
    <QuizzesLayout>
      <Card className={"card_create_room"} bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0
      }}>
        <Header className={"card_create_room__header"} style={{
          backgroundColor: "white"
        }}>
          <h2 className={"card_create_room__header_title"}>Create room</h2>
        </Header>
        <label className={"card_create_room__create_block"}>
          <p className={"card_create_room__input_name"}>Room name</p>
          <input type={"text"} className={"card_create_room__input"} onChange={onChange} />
        </label>
        <Link className={"card_create_room__continue"} onClick={createRoom} to={"/"}>Continue</Link>
      </Card>
    </QuizzesLayout>
  );
};

export default CreateRoom;
