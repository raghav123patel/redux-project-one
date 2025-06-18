import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserDetails,
  clearMessages,
} from "../../features/user/editUserDetailSlice";

function EditUserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading, error, successMessage } = useSelector(
    (state) => state.editUserDetail
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      dispatch(clearMessages());
      navigate("/userlist");
    }
  }, [successMessage, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUserDetails({ id, values: formData }));
  };

  return (
    <div className="container mt-5">
      <button onClick={() => navigate("/userlist")}>Back</button>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              disabled
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-warning w-100" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
        {error && <p className="text-danger text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default EditUserDetail;
