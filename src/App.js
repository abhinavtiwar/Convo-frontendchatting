import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import { UserProvider } from "./userContext";
import Authorisor from "./userAuth";
import ManageUser from "./components/ManageUser";

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  return (
    <div className="">
      <BrowserRouter>
        <UserProvider currentUser={currentUser}>
          <Header  CurrentUser={currentUser} />
          <Routes>
            <Route element={<Home />} path="homepage" />
            <Route
              element={
                <Authorisor>
                  <Chat />
                </Authorisor>
              }
              path="chatpage"
            />
            <Route element={<Login />} path="loginpage" />
            <Route element={<Register />} path="registerpage" />
            <Route element={<NotFound />} path="404" />
            <Route element={<ManageUser />} path="manageuserpage" />

            <Route exact element={<Navigate to="homepage" />} path="/" />
            <Route exact element={<Navigate to="404" />} path="*" />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
