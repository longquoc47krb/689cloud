import "antd/dist/antd.min.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { authSelector, userSelector } from "./redux/slices/authSlice";
import Blank from "./screen/Admin/Blank";
import AdminLayout from "./screen/Admin/layout";
import Messages from "./screen/Admin/Messages";
import UserGroup from "./screen/Admin/UserGroup";
import UsersPage from "./screen/Admin/Users";
import Dashboard from "./screen/Dashboard";
import Login from "./screen/Login";
function App() {
  const token = useSelector((state) => state.auth.user?.access_token);
  const user = useSelector(userSelector);
  const auth = useSelector(authSelector);
  const { t } = useTranslation();
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
        <Route path='/dashboard' element={<Dashboard role={t("user")} />} />
      </Routes>
    );
  }
  function GuessRoutes() {
    return (
      <Routes>
        <Route path='*' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login title={t("user-login")} />} />
        <Route
          path='/admin-login'
          element={<Login title={t("admin-login")} />}
        />
      </Routes>
    );
  }
  // if (!token && !auth.loading) {
  //   return (
  //     <>
  //       <BrowserRouter>
  //         <Routes>
  //           <Route path='/*' element={<GuessRoutes />} />
  //         </Routes>
  //       </BrowserRouter>
  //     </>
  //   );
  // } else if (token && user.role_level === 4) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    );
  // } else {
  //   return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path='/*' element={<UserRoutes />} />
  //       </Routes>
  //     </BrowserRouter>
  //   );
  // }
}

export default App;
