import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import EditNote from "./components/EditNote";
import CreateNote from "./components/CreateNote";

function App() {
  return (
    <Router>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateNote />} />
              <Route path="/edit/:id" element={<EditNote />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
