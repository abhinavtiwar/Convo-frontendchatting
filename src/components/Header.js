import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import chatlogo from "../images/chatlogo.png";
import { UserContext } from "../userContext";
import "./chat.css";

// import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const { loggedIn, setLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/loginpage");
    setLoggedIn(false);
    // window.location.reload();
  };

  const showLogin = () => {
    if (!loggedIn) {
      return (
        <NavLink className="btn btn-success white" to="/loginpage">
          <i class="fa-solid fa-right-to-bracket me-2"></i>
          Login/Registration
        </NavLink>
      );
    } else {
      return (
        <button className="btn btn-danger white " onClick={logout}>
          <i class="fa-solid fa-right-from-bracket me-2"></i>
          Logout
        </button>
      );
    }
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-black bg-black fixed-top  ">
        <div class="container ">
          <Link class="navbar-brand m-2" to ="/">
            <img
              src={chatlogo}
              height="40"
              alt="logo"
              loading="lazy"
              style={{ marginTop: "-1px" }}
            />
            <small className="text-white mx-3 fs-2 text-style ">Convo</small>
          </Link>

          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarButtonsExample">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                {/* <NavLink className="nav-link white" to="/homepage">
                  Home
                </NavLink> */}
              </li>
              <li className="nav-item mx-2">
                {/* <div className="name-tag">
                  <span className="hi">Hi,&nbsp; </span>
                  {currentUser.name}
                </div> */}
              </li>
              <li className="nav-item mx-2">
                {showLogin()}

                {/* <NavLink className="btn btn-success white" to="/loginpage">
                  { ? "Logout" : "Login/Registration"}
                </NavLink> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
