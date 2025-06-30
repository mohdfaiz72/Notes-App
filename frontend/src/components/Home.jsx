import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/notes")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/notes/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setNotes((prev) => prev.filter((note) => note._id !== id));
      } else {
        alert(data?.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-start px-4 py-4">
      {loading ? (
        <div className="flex justify-center items-center h-full mt-32">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent" />
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-700">Nothing Here Yet</h2>
          <p className="text-gray-500 mt-2">
            All your notes have been deleted. Time to create something new ✨
          </p>
          <button
            onClick={() => navigate("/create")}
            className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-1 rounded"
          >
            Create Note
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-8 text-gray-700 text-center">
            🗒️ All Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
