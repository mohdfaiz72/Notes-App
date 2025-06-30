import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/notes/get-note/${id}`
        );
        const data = await res.json();
        if (res.ok && data.data) {
          const note = data.data;
          setTitle(note.title);
          setContent(note.content);
          setTags(note.tags.join(" "));
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedNote = {
      title,
      content,
      tags: tags.trim().split(" "),
    };

    try {
      const res = await fetch(`http://localhost:8000/api/notes/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading note...</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        ✏️ Edit Note
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded"
          >
            Update Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
