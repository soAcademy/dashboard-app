import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

const App = () => (
  <BrowserRouter>
    <Sidebar />
  </BrowserRouter>
);
export default App;
