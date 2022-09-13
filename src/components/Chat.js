import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Swal from "sweetalert2";
import "./chat.css";

const Chat = () => {
  const url = "http://localhost:5000";
  const [socket] = useState(io(url, { autoConnect: false }));
  const [text, setText] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  // const [contactId, setContactId] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [messageList, setMessageList] = useState([
    // { text : 'Kal kon sa exam hai?', sent: true }
  ]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selContact, setSelContact] = useState(null);
  const addContact = async (contactId) => {
    const response = await fetch(url + "/user/pushupdate/" + currentUser._id, {
      method: "PUT",
      body: JSON.stringify({ contacts: contactId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.status);
    if (response.status == 200) {
      response.json().then((data) => {
        console.log(data);
        sessionStorage.setItem("user", JSON.stringify(data));
        setCurrentUser(data);
      });
    }
  };

  const addOnline = () => {
    console.log(currentUser);
    socket.emit("setonline", currentUser._id);
  };

  useEffect(() => {
    socket.connect();
    console.log(currentUser);
    if (currentUser !== null) addOnline();

    socket.on("recmsg", (data) => {
      setMessageList([...messageList, data]);
      saveChat({
        chatData: data,
        user: currentUser._id,
        rec: selContact._id,
        createdAt: new Date(),
      });
    });

    socket.on("usersonline", (data) => {
      console.log(data);
      // setOnlineUsers(data);
    });
  });

  // const uploadFile = async (e) => {
  //   setText(e.target.value);
  //   const file = e.target.files[0];
  //   const fd = new FormData();
  //   setThumbnail(file.name);

  //   fd.append("file", file);

  //   const response = await fetch("http://localhost:5000/util/uploadfile", {
  //     method: "POST",
  //     body: fd,
  //   });

  //   if (response.status == 200) {
  //     console.log("file upload success");
  //   }
  // };

  const saveChat = (formdata) => {
    console.log(formdata);

    fetch("http://localhost:5000/chat/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);
    });
  };

  const sendMessage = () => {
    let obj = { text: text, sent: true, rec_id: selContact._id };
    socket.emit("sendmsg", obj);
    setMessageList([...messageList, obj]);
    saveChat({
      chatData: obj,
      user: currentUser._id,
      rec: selContact._id,
      createdAt: new Date(),
    });
  };

  const checkUser = () => {
    fetch("http://localhost:5000/user/getbyemail/" + contactEmail)
      .then((res) => {
        res.json().then((data) => {
          if (data) {
            console.log(data);
            const conToAdd = currentUser.contacts.filter(
              (con) => con._id === data._id
            );
            if (!conToAdd.length) {
              if (contactEmail !== currentUser._id) {
                addContact(data._id);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops!!",
                  text: "Invalid Email",
                });
              }
            } else {
              // already exist message
              Swal.fire({
                icon: "error",
                title: "Oops!!",
                text: "Already Exist",
              });
            }
          } else {
            // invalid email message
            Swal.fire({
              icon: "error",
              title: "Oops!!",
              text: "Invalid Email",
            });
          }
        });
      })
      .catch((err) => {});
  };

  const displayMessages = () => {
    return messageList.map(({ text, sent }) => (
      <div className="msg-body">
        <p className={"msg-text " + (sent ? "msg-sent" : "msg-rec")}>{text}</p>
      </div>
    ));
  };

  const showSelContact = () => {
    if (selContact !== null) {
      return (
        <div className="text-danger fst-italic bg-black name-tag sticky-top">
          <div className="ms-4 py-3 ">
            <h4>{selContact.name}</h4>
          </div>
        </div>
      );
    }
  };
  const showMessage = () => {
    if (selContact == null) {
      return (
        <div className="container  text-warning fst-italic  margin-center">

            <h4 className="fs-2">Hi, {currentUser.name}</h4>
            <p className="fs-5"><i class="fa-solid fa-circle-arrow-left"></i>&nbsp; Select friend to chat.
            </p>
          </div>
        
      );
    }
  };

  const fetchChats = (contactid) => {
    fetch(
      "http://localhost:5000/chat/getbyuser/" +
        currentUser._id +
        "/" +
        contactid
    ).then((res) => {
      res.json().then((data) => {
        console.log(data);
        // (data.chatData);
        setMessageList(data.map((obj) => obj.chatData));
      });
    });
  };

  return (
    <div className="h-100 mt-5 pt-2 bg-dark">
      <div className="container pt-5">
        <div className="hidden">
          <h1>{currentUser._id}</h1>
          <h1>{currentUser.name}</h1>
        </div>

        <div className="row">
          <div className="col-md-4 scroll mx-4">
            <div className="input-group sticky-top">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <button onClick={checkUser} className="btn btn-primary">
                Add Friend
              </button>
            </div>
            {currentUser.contacts.map(({ _id, name, email, contact }) => (
              <div
                className="user hover-overlay ripple "
                onClick={(e) => {
                  fetchChats(_id);
                  setSelContact({ _id, name, email, contact });
                }}
              >
                <h5>{name}</h5>
                <p>{email}</p>
                {/* <p className="text-view">{text}</p> */}
              </div>
            ))}
          </div>
          <div className="col-md-7 mx-2 ">
            <div className="card chat-scroll bg ">
              {showMessage()}
              {showSelContact()}
              <div className="card-body ">
                <div className="chat-area ">
                  {displayMessages()}
                </div>
              </div>
            </div>
            <div className="  ">
              <div class="input-group mb-3 ">
                <button
                  class="btn btn-outline-primary"
                  type="submit"
                  for="imp"
                  id="button-addon1"
                  data-mdb-ripple-color="dark"
                >
                  <i class="fa-solid fa-paperclip fs-6 p-0"></i>
                </button>
                <input
                  type="text"
                  className="form-control "
                  aria-describedby="button-addon2"
                  id="imp"
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  class="btn btn-primary"
                  onClick={sendMessage}
                  type="button"
                  id="button-addon2"
                  data-mdb-ripple-color="dark"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
