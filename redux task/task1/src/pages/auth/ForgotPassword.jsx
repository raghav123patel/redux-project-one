import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { forgotPassword, clearMessages } from "../../features/auth/forgotPasswordSlice";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector((state) => state.forgotPassword);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(forgotPassword(values.email));
    },
  });

  useEffect(() => {
    
    dispatch(clearMessages());
  }, [dispatch]);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Forgot Password</h3>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {successMessage && (
          <div className="alert alert-success text-center mt-3">{successMessage}</div>
        )}
        {error && <div className="alert alert-danger text-center mt-3">{error}</div>}
      </div>
    </div>
  );
}

export default ForgotPassword;
