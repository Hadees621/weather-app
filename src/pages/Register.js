import { auth } from "../firebase";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/sign-in");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className="container-fluid">
      <div class="row">
        <div class="col-12 d-flex justify-content-center p-4">
          <Link to={"/sign-in"}>
            {" "}
            <button class="transparent-btn mx-2 text-white shadow outline-none border-0 ">
              Login
            </button>
          </Link>
          <Link to={"/sign-up"}>
            {" "}
            <button class="transparent-btn mx-2 text-white shadow outline-none border-0 ">
              Sign up
            </button>
          </Link>
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <div class="weather-container shadow container">
            <div class="row">
              <div class="col-12 p-5">
                <h3 class="text-center text-white">Register</h3>
              </div>
            </div>
            <div class="row">
              <div class="col-12 px-5 d-flex justify-content-center align-items-center">
                <form
                  className="login-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div class="form-group">
                    <label for="exampleInputEmail1" className="text-white my-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      class="form-control bg-transparent text-white"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter name"
                      onChange={(event) =>
                        setValues((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1" className="text-white my-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      class="form-control bg-transparent text-white"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={(event) =>
                        setValues((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div class="form-group my-2">
                    <label for="exampleInputEmail1" className="text-white my-">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control bg-transparent text-white"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter password"
                      onChange={(event) =>
                        setValues((prev) => ({
                          ...prev,
                          pass: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <b className="error text-danger">{errorMsg}</b>
                  <button
                    onClick={handleSubmission}
                    type="submit"
                    class="btn btn-primary w-100 bg-black outline-none border-0 mt-3"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
