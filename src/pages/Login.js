import { auth } from "../firebase";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        navigate("/");
      })
      .catch((err) => {
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
                <h3 class="text-center text-white">LOGIN</h3>
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
                      Email address
                    </label>
                    <input
                      type="email"
                      class="form-control bg-transparent text-white"
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
                    <label for="exampleInputEmail1" className="text-white my-2">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control bg-transparent text-white"
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

export default Login;
