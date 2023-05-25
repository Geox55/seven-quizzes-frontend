import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./pages/Start/Start";
import Game from "./pages/Game/Game";
import End from "./pages/End/End";
import SignIn from "./pages/SignIn/SignIn";
import Rooms from "./pages/Rooms/Rooms";
import CreateRoom from "./pages/CreateRoom/CreateRoom";
import PrivateLayout from "./layouts/PrivateLayout/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout/PublicLayout";
import SignUp from "./pages/SignUp/SignUp";

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<PrivateLayout><Start /></PrivateLayout>} />
        <Route path="/game" element={<PrivateLayout><Game /></PrivateLayout>} />
        <Route path="/end" element={<PrivateLayout><End /></PrivateLayout>} />
        <Route path="/sign" element={<PublicLayout><SignIn /></PublicLayout>} />
        <Route path="/" element={<PrivateLayout><Rooms /></PrivateLayout>} />
        <Route path="/create_room" element={<PrivateLayout><CreateRoom /></PrivateLayout>} />
        <Route path="/registration" element={<PublicLayout> <SignUp /></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
