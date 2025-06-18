import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserList, removeUser } from "../../features/user/userListSlice";
import axiosInstance from "../../helper/Axiosinterceptor";

function Userlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, totalUsers, loading } = useSelector((state) => state.userList);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); 
  const totalPages = Math.ceil(totalUsers / pageSize);

  useEffect(() => {
    dispatch(getUserList({ pageNumber, pageSize }));
  }, [dispatch, pageNumber, pageSize]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      dispatch(removeUser({ id, pageNumber, pageSize }));

    
    setAllUser(prev => prev.filter(user => user.id !== id));
    }
  };

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const response = await axiosInstance.get('user?pageNumber=1&pageSize=1000');
        setAllUser(response.data.data);
      } catch (error) {
        console.log("error in fetching all users", error);
      }
    };

    fetchAllUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const filteredUsers = searchTerm
    ? (allUser || []).filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return sortOrder === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Sign Out
        </button>
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Total Users: {filteredUsers.length}</h5>
        <button
          className="btn btn-secondary"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      {loading ? (
        <center>
          <div className="spinner-border" role="status"></div>
        </center>
      ) : (
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-3">User List</h4>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>Sr No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.length > 0 ? (
                    sortedUsers.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() => navigate(`/user/${user.id}`)}
                          >
                            Detail
                          </button>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => navigate(`/edit-user/${user.id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {searchTerm === "" && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-outline-secondary"
            disabled={pageNumber === 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>
          <span>
            Page {pageNumber} of {totalPages}
          </span>
          <button
            className="btn btn-outline-secondary"
            disabled={pageNumber === totalPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Userlist;
