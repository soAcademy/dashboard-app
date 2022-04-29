import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { DeathCause } from "./pages/DeathCause";

const App = () => (
  <BrowserRouter>
    <div className="flex">
      <Sidebar />
      <div className="pl-16 w-full">
        <Routes>
          <Route path="/death-cause" element={<DeathCause />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);
export default App;
