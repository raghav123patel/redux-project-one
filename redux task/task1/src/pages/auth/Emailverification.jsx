import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmailThunk, resetVerificationState } from "../../features/auth/emailVerificationSlice";

function EmailVerification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { evtoken, id } = useParams();

  const { loading, success, error, message } = useSelector((state) => state.emailVerification);

  const handleVerify = () => {
    dispatch(verifyEmailThunk({ token: evtoken, id }));
  };

  useEffect(() => {
    if (success) {
      alert("Email verified successfully!");
      dispatch(resetVerificationState());
      navigate("/");
    }

    if (error) {
      alert(error);
      dispatch(resetVerificationState());
    }
  }, [success, error, dispatch, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card text-center p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-4">Email Verification</h3>
        <button
          onClick={handleVerify}
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
        {message && <p className="mt-3 text-success">{message}</p>}
      </div>
    </div>
  );
}

export default EmailVerification;
