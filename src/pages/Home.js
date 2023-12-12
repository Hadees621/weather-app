import React, { useEffect, useRef, useState } from "react";
import { GetLocation } from "../services";
import { signOut } from "firebase/auth";
import Weather from "../components/Weather";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  return (
    <>
      {" "}
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
    </>
  );
}

function Home() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [searchQuery, setQuery] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      const city = await GetLocation();
      setLoggedIn(false);
      setQuery(null);
      navigate("/");
      setQuery(city);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && setLoggedIn(true);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div class="row">
        <div class="col-12 d-flex justify-content-center p-4">
          {!isLoggedIn && <Header />}
          {isLoggedIn && (
            <>
              <input
                ref={inputRef}
                placeholder="Enter Location"
                class="transparent-btn text-white shadow outline-none border-0 "
              />
              <button
                onClick={() => setQuery(inputRef.current.value)}
                class="transparent-btn mx-2 text-white shadow outline-none border-0 mx-0"
              >
                Search
              </button>
            </>
          )}

          {isLoggedIn && (
            <button
              style={{ position: "relative", left: "130px" }}
              onClick={handleLogout}
              class="transparent-btn bg-black text-white shadow outline-none border-0 mx-0"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <div class="weather-container shadow container">
            <Weather searchQuery={searchQuery} loggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
