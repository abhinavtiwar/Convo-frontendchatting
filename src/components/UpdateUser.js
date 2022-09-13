
import { Formik } from "formik";
import React from "react";
import Swal from "sweetalert2";

const UpdateUser = ({ userFormData, fetchData, setShowUpdateForm }) => {
  const handleFormSubmit = (formdata) => {
    console.log(formdata);

    // 1. address
    // 2. request method
    // 3. data to be sent
    // 4. data format

    fetch("http://localhost:5000/user/update/" + userFormData._id, {
      method: "PUT",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Update Successful",
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

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="text-muted text-center">Update User</h3>

          <Formik initialValues={userFormData} onSubmit={handleFormSubmit}>
            {({ values, handleSubmit, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <label className="mt-4">Name</label>
                <input
                  className="form-control"
                  placeholder="name"
                  value={values.name}
                  id="name"
                  onChange={handleChange}
                />
                <label className="mt-4">Email</label>
                <input
                  className="form-control"
                  placeholder="Email Address"
                  value={values.email}
                  id="email"
                  onChange={handleChange}
                />
                <label className="mt-4">Contact</label>
                <input
                  className="form-control"
                  placeholder="Contact"
                  value={values.contact}
                  id="contact"
                  onChange={handleChange}
                />
                <label className="mt-4">Password</label>
                <input
                  className="form-control"
                  placeholder="Secret Password"
                  type="password"
                  value={values.password}
                  id="password"
                  onChange={handleChange}
                />

                <button className="btn btn-primary mt-5">Update User</button>
                <button
                  className="btn btn-danger mt-5"
                  type="button"
                  onClick={(e) => setShowUpdateForm(false)}
                >
                  Cancel
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
