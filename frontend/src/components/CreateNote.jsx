import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteData = {
      title,
      content,
      tags: tags.split(" "),
    };

    try {
      const res = await fetch("http://localhost:8000/api/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (res.ok) {
        navigate("/");
      } else {
        console.error("Failed to create note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Create a New Note
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Tags (space-separated) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-6 py-2 rounded shadow-sm transition"
          >
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
