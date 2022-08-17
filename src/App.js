import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screen/Login";
import "antd/dist/antd.min.css";
import { useSelector } from "react-redux";
import UserPage from "./screen/UserFragment";
import { userSelector } from "./redux/slices/authSlice";
function App() {
  const user = useSelector(userSelector);
  return (
    <div className='App'>
      {!user ? (
        <BrowserRouter>
          <Routes>
            <Route path='/' exact element={<Login />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path='/' exact element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
