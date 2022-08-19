import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "antd/dist/antd.min.css";
import { useSelector } from "react-redux";
import { authSelector, userSelector } from "./redux/slices/authSlice";
import Login from "./screen/Login";
import Dashboard from "./screen/Dashboard";
import NotFound from "./screen/NotFound";
import AdminLayout from "./screen/Admin/layout";
import Blank from "./screen/Admin/Blank";
import UserGroup from "./screen/Admin/UserGroup";
import UsersPage from "./screen/Admin/Users";
import Messages from "./screen/Admin/Messages";
function App() {
  const token = useSelector((state) => state.auth.user?.access_token);
  const user = useSelector(userSelector);
  const auth = useSelector(authSelector);
  function AdminRoutes() {
    return (
      <Routes>
        <Route path='/' element={<AdminLayout />}>
          <Route
            path='/files'
            element={<Blank name='This is File Management page' />}
          />
          <Route path='/group' element={<UserGroup />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/messages' element={<Messages />} />
          <Route
            path='/dashboard'
            element={<Blank name='This is Dashboard' />}
          />
          <Route path='*' element={<Navigate to='/users' replace />} />
        </Route>
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
