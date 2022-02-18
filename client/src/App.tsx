import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TablePage from "./pages/TablePage";
import { ProtectedRoute } from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/tables' element={<ProtectedRoute />}>
          <Route path="/tables" element={<TablePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
