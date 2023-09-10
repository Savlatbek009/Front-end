import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Debts from "./pages/debt/Debts";
import Transactoin from "./pages/transaction/Transactoin";

function App() {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="debts" element={<Debts />} />
      <Route path="transaction" element={<Transactoin />} />
    </Routes>
  );
}

export default App;
