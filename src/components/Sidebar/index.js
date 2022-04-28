import {
  MedicalIcon,
  CarIcon,
  FinderIcon,
  NoteIcon,
} from "../../components/Svg";
import { Link } from "react-router-dom";

export const Sidebar = () => (
  <div className="w-16 bg-gradient-to-b from-teal-600 to-cyan-900 h-screen fixed text-center">
    <div className="w-full px-2 py-4">
      <Link to="/">
        <div className="bg-white hover:bg-gray-200 mt-4 w-12 h-12 rounded-full align-middle text-3xl text-teal-600 font-bold pt-1">
          D
        </div>
      </Link>
    </div>
    <div className="w-full text-center py-4 hover:bg-white hover:bg-opacity-30 cursor-pointer">
      <Link to="/death-cause">
        <div className="px-5">
          <MedicalIcon />
        </div>
      </Link>
    </div>
    <div className="w-full text-center py-4 hover:bg-white hover:bg-opacity-30 cursor-pointer">
      <Link to="/accident">
        <div className="px-5">
          <CarIcon />
        </div>
      </Link>
    </div>
    <div className="w-full text-center py-4 hover:bg-white hover:bg-opacity-30 cursor-pointer">
      <Link to="/zipcode">
        <div className="px-5">
          <FinderIcon />
        </div>
      </Link>
    </div>
    <div className="w-full text-center py-4 hover:bg-white hover:bg-opacity-30 cursor-pointer">
      <Link to="/todo-list">
        <div className="px-5">
          <NoteIcon />
        </div>
      </Link>
    </div>
  </div>
);
