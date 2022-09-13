import { TextField, Button } from "@mui/material";
import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./style.css";
import chatlogo from "../images/chatlogo.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../userContext";

const Login = () => {
  const navigate = useNavigate();

  const { setLoggedIn } = useContext(UserContext);

  const handleFormSubmit = (formdata) => {
    console.log("Login Successfull!");
    console.log(formdata);

    fetch("http://localhost:5000/user/authenticate", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login Successful",
        }).then(() => {
          res.json().then((userdata) => {
            console.log(userdata);
            setLoggedIn(true);
            sessionStorage.setItem("user", JSON.stringify(userdata));
            navigate("/chatpage");
          });
        });
      } else if (res.status === 300) {
        Swal.fire({
          icon: "error",
          title: "Oops!!",
          text: "Invalid Credentials",
        });
      }
    });
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required field"),
    password: Yup.string().required(" Required field"),
  });

  return (
    <div
      className="container-fluid"
      style={{
        background:
          "linear-gradient(to right, rgba(37, 37, 37, 0.547),rgba(33, 33, 33, 0.524)),url('https://img.freepik.com/free-vector/flat-design-yellow-comic-style-background_23-2148790011.jpg?w=800') ",
        backgroundRepeat: "no-repeat",
        height: "92vh",
        backgroundSize: "cover",
      }}
    >
      <div className="mt-lg " style={{ height: "90vh" }}>
        <div className="row h-100 justify-content-center align-items-center ">
          <div className="col-md-3">
            <div className="card ">
              <div className="card-body">
                {/* <h3 className=" text-center">Login </h3> */}
                <img src={chatlogo} alt="logo" className="img-logo " />
                <hr />
                <Formik
                  initialValues={{ email: "", password: "" }} //specifying initial value for form
                  onSubmit={handleFormSubmit} // function to handle form submission
                  validationSchema={loginSchema}
                >
                  {({ values, handleChange, handleSubmit, errors }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        sx={{ mt: 3 }}
                        fullWidth
                        label="Email"
                        placeholder="Email Address"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                      />

                      <TextField
                        sx={{ mt: 3 }}
                        fullWidth
                        type="password"
                        label="Password"
                        placeholder="Password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                      />

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 5 }}
                        color="success"
                      >
                        Login Now
                      </Button>
                      <hr className="" />
                      <p
                        className="fs-6 fw-bold"
                        style={{ textAlign: "center" }}
                      >
                        Don't have an account?
                        <Link className=" darkgreen fs-5 " to={"/registerpage"}>
                          Sign up
                        </Link>
                      </p>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
