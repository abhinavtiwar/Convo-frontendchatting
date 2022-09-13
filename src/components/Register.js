import { Formik } from "formik";
import React from "react";
import "./style.css";
import * as Yup from "yup";
import chatlogo from "../images/chatlogo.png";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (formdata) => {
    console.log("Signup Successfull!");
    console.log(formdata);

    fetch("http://localhost:5000/user/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Registration Successful",
        }).then(() => {
          navigate("/loginpage");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!!",
          text: "Some Error Occured",
        });
      }
    });
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required field"),
    name: Yup.string().required(" Required field"),
    contact: Yup.number().required(" Required field"),
    password: Yup.string().required(" Required field"),
  });

  return (
    <div
      className="container-fluid"
      style={{
        background:
          "linear-gradient(to right, rgba(37, 37, 37, 0.547),rgba(33, 33, 33, 0.524)),url('https://img.freepik.com/free-vector/flat-comic-style-background_52683-54433.jpg?w=1580&t=st=1659197352~exp=1659197952~hmac=c5132a951fdd9b3eb85a1e65518f073ed102f7764ab97889a834f0163bacd216') ",
        backgroundRepeat: "no-repeat",
        height: "92vh",
        backgroundSize: "cover",
      }}
    >
      <div className="container mt-rt ">
        <div className="card mask-custom ">
          <div className="card-body ">
            <img src={chatlogo} alt="" className="img-logo1 " />

            <Formik
              initialValues={{
                name: "",
                email: "",
                contact: "",
                password: "",
              }}
              onSubmit={handleFormSubmit}
              validationSchema={loginSchema}
            >
              {({ values, handleChange, handleSubmit, errors }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    placeholder="Name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    className="txt-fld"
                  />

                  <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    placeholder="Email Address"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    className="txt-fld"
                  />

                  <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    type="number"
                    placeholder="Contact Number"
                    id="contact"
                    value={values.contact}
                    onChange={handleChange}
                    error={Boolean(errors.contact)}
                    helperText={errors.contact}
                    className="txt-fld"
                  />
                  <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    className="txt-fld"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, p: 2 }}
                    color="success"
                  >
                    Submit
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
