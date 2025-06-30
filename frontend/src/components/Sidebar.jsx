import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-48 h-screen bg-gray-900 text-gray-200 p-4">
      <ul className="space-y-4 text-lg">
        <li>
          <Link to="/" className="block p-2 hover:bg-cyan-800 rounded">
            🏠 Home
          </Link>
        </li>
        <li>
          <Link to="/create" className="block p-2 hover:bg-cyan-800 rounded">
            📝 Create Note
          </Link>
        </li>
        <li>
          <Link className="block p-2 hover:bg-cyan-800 rounded">
            ⚙️ Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
