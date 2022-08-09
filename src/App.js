import { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import Table from "./pages/Table";
import Todo from "./pages/Todo";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route path='/todo' element={<Todo />} />
          <Route path='/table' element={<Table />} />
          <Route path='/' element={<Navigate to='/table' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
