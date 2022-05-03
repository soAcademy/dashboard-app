import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { DeathCause } from "./pages/DeathCause";
import { Zipcode, ZipcodeProvince } from "./pages/Zipcode";
import { TodoList } from "./pages/TodoList";
import { Accident } from "./pages/Accident";

const App = () => (
  <BrowserRouter>
    <div className="flex">
      <Sidebar />
      <div className="pl-16 w-full">
        <Routes>
          <Route path="/" element={<DeathCause />} />
          <Route path="/death-cause" element={<DeathCause />} />
          <Route path="/zipcode" element={<Zipcode />} />
          <Route path="/zipcode/:province" element={<ZipcodeProvince />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/accident" element={<Accident />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);
export default App;
