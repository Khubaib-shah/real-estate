import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../component/OAuth";
const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-6xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded"
          id="email"
          autoComplete="email"
          onChange={handleOnChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded"
          id="password"
          autoComplete="current-password"
          onChange={handleOnChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 hover:opacity-95 disabled:opacity-80 uppercase rounded-lg"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="font-semibold">Don't have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700 font-semibold">Sign Up</span>
        </Link>
      </div>
      <div>{error && <p className="text-red-700">{error}</p>}</div>
    </div>
  );
};

export default Signin;
