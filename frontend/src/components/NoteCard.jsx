import { useState } from "react";

const NoteCard = ({ note, handleUpdate, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-100 p-4 rounded shadow relative">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">{note.title}</h2>
          <p className="text-gray-700 mt-1">{note.content}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {note.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-700 px-2"
          >
            ⋮
          </button>

          {isOpen && (
            <div className="absolute right-0 top-6 bg-gray-50 border rounded shadow z-10 w-32">
              <button
                className="w-full px-4 py-2 text-left hover:bg-cyan-700"
                onClick={() => {
                  handleUpdate(note._id);
                  setIsOpen(false);
                }}
              >
                ✏️ Edit
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-cyan-700 text-red-600"
                onClick={() => {
                  handleDelete(note._id);
                  setIsOpen(false);
                }}
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
