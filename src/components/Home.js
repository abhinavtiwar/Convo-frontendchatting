import React from "react";
import { Link } from "react-router-dom";
import "./chat.css";

const Home = () => {
  return (
    <div className="pt-5">
      <div
        className="p-5 text-center bg-image"
        style={{
          background:
            'url("https://img.freepik.com/free-vector/flat-comic-style-background_23-2148818908.jpg?w=1520&t=st=1659198395~exp=1659198995~hmac=41c4e4c84bedff61acfc84a330abaef2f46a3f0d31fa7ad770be9ad638eb8223")',
          height: "94vh",
        }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-light " style={{ paddingTop: "360px" }}>
              {/* <h1 className="mb-3 text-style">Let's Start Chatting</h1> */}
              
              <Link className="btn btn-outline-light btn-lg text-style fs-2 text-black border-style" role="button" to="/chatpage">
              Let's &nbsp;Start &nbsp;Chatting
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
// https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18310.jpg?w=1520&t=st=1657633266~exp=1657633866~hmac=139323b5a9329cc3781befe1a67914b0cbf9cf69815d4c8426336085ad83894f