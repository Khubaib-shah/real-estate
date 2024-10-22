import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../component/OAuth";
const SignUp = () => {
  const [fromData, setFromData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.id]: e.target.value,
    });
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fromData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-6xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded"
          id="username"
          autoComplete="username"
          onChange={handleOnChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded"
          id="email"
          autoComplete="email"
          onChange={handleOnChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded"
          id="password"
          autoComplete="current-password"
          onChange={handleOnChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 hover:opacity-95 disabled:opacity-80 uppercase rounded-lg"
        >
          {" "}
          {loading ? "Loading..." : "Sign up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="font-semibold">Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700 font-semibold">Sign in</span>
        </Link>
      </div>
      <div>{error && <p className="text-red-700">{error}</p>}</div>
    </div>
  );
};

export default SignUp;
