import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearResetMessages } from "../../features/auth/resetPasswordSlice";

function ResetPassword() {
  const { token, userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, successMessage, error } = useSelector((state) => state.resetPassword);

  const [password, setPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    dispatch(resetPassword({ password, token, userId }));
  };

  useEffect(() => {
    dispatch(clearResetMessages());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      navigate("/");
    }
  }, [successMessage, navigate]);

  return (
    <form onSubmit={handleReset} className="reset-password-form">
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="updatepassbtn" disabled={loading}>
        {loading ? "Updating..." : "Update Password"}
      </button>

      {error && <div className="text-danger text-center mt-2">{error}</div>}
    </form>
  );
}

export default ResetPassword;
