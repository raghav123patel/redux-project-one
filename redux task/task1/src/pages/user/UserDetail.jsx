import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, clearUserDetail } from "../../features/user/userDetailSlice";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(getUserDetail(id));

    
    return () => dispatch(clearUserDetail());
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading user detail...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>{error}</p>
        <button className="btn btn-secondary" onClick={() => navigate("/userlist")}>
          Back to List
        </button>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <button onClick={() => navigate("/userlist")} className="btn btn-light position-absolute top-0 start-0 m-3">
        Back
      </button>

      <div
        className="card shadow-lg text-white"
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "linear-gradient(135deg, #6f42c1, #d63384)",
          borderRadius: "1rem",
        }}
      >
        <div className="card-body text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="User Logo"
            style={{ width: "80px", marginBottom: "15px" }}
          />
          <h3 className="card-title mb-3">User Details</h3>
          <p className="card-text"><strong>Name:</strong> {user.name}</p>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
