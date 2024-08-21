import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddBook from "./pages/AddBook";
import DashBoard from "./pages/DashBoard";
import "./assets/sass/main.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard">
          <Route index element={<DashBoard />} />
          <Route path="addBook" element={<AddBook />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
