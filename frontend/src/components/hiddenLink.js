import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const ShowOnLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export const AdminOnlyRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const userRole = user?.role;
  if (userRole === "admin") {
    return children;
  }
  return (
    <div className="h-[96vh] hero">
      <div className="flex flex-col hero-content">
        <h2 className="h2">Permission denied</h2>
        <p>This page can only be viewed by an admin user.</p>

        <Link to={"/"}>
          <button type="submit" className="w-full btnPrimary">
            Please go back to the Home page
          </button>
        </Link>
      </div>
    </div>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const user = useSelector(selectUser);
  const userRole = user?.role;
  if (userRole === "admin") {
    return children;
  }
  return null;
};

export default ShowOnLogin;
