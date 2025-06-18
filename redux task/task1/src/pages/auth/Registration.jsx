import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/registerSlice";

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.register);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Username is required";
      if (!values.email) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Invalid email";
      if (!values.password) errors.password = "Password is required";
      else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";
      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        dispatch(registerUser({name:values.name,email:values.email,password:values.password})).then(res=>{
          const { emailVerificationTOken, id } = res.payload;
          navigate(`/verification/${emailVerificationTOken}/${id}`);

        })
      } catch (error) {
        console.error("Registration error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "rgb(138 157 221)" }}>
      <form onSubmit={formik.handleSubmit} className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}>
        <h2 className="text-center mb-4">Registration</h2>

        <div className="form-group mb-3">
          <label>Username</label>
          <input
            type="text"
            name="name"
            className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
            placeholder="Enter username"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.touched.name && formik.errors.name && <div className="invalid-feedback">{formik.errors.name}</div>}
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
        </div>

        <div className="form-group mb-4">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.touched.password && formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-outline-success" disabled={formik.isSubmitting || loading}>
          {formik.isSubmitting || loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Registration;
