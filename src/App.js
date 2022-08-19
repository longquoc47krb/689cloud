import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "antd/dist/antd.min.css";
import { useSelector } from "react-redux";
import { authSelector, userSelector } from "./redux/slices/authSlice";
import Login from "./screen/Login";
import Dashboard from "./screen/Dashboard";
import NotFound from "./screen/NotFound";
function App() {
  const token = useSelector((state) => state.auth.user?.access_token);
  const user = useSelector(userSelector);
  const auth = useSelector(authSelector);
  function AdminRoutes() {
    return (
      <Routes>
        <Route path='/dashboard' element={<Dashboard role='Admin' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    );
  }
  function UserRoutes() {
    return (
      <Routes>
        <Route path='/dashboard' element={<Dashboard role='User' />} />
      </Routes>
    );
  }
  function GuessRoutes() {
    return (
      <Routes>
        <Route path='*' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login title='User Login' />} />
        <Route path='/admin-login' element={<Login title='Admin Login' />} />
      </Routes>
    );
  }
  if (!token && !auth.loading) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<GuessRoutes />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  } else if (token && user.role_level === 4) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
