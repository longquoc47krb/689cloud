import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "antd/dist/antd.min.css";
import AppLayout from "./layout";
import Blank from "./pages/Blank";
import UsersPage from "./pages/Users";
import UserGroup from "./pages/UserGroup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route
            path='/files'
            element={<Blank name='This is File Management page' />}
          />
          <Route path='/group' element={<UserGroup />} />
          <Route path='/users' element={<UsersPage />} />
          <Route
            path='/messages'
            element={<Blank name='This is Messenger Management page' />}
          />
          <Route path='/home' element={<Blank name='This is Dashboard' />} />
          <Route path='*' element={<Navigate to='/users' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
