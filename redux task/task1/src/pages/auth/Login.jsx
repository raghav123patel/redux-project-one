import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/loginSlice";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.login);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUser(values)).then(() => navigate("/userlist"));
    },
  });

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#121212" }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="login-card p-4"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4 text-white">Login</h2>

        
        <div className="form-group mb-3">
          <label className="text-white">Email</label>
          <div className="input-group">
            <span className="input-group-text"><FaEnvelope /></span>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={formik.values.email}
              onChange={formik.handleChange}
              required
              autoComplete="email"
            />
          </div>
        </div>

        
        <div className="form-group mb-4">
          <label className="text-white">Password</label>
          <div className="input-group">
            <span className="input-group-text"><FaLock /></span>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 mb-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <div className="text-danger text-center">{error}</div>}

        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            className="btn btn-link text-white p-0"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password
          </button>
          <button
            type="button"
            className="btn btn-link text-white p-0"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
