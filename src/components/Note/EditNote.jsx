import React, { useState } from "react";
import axios from "axios";

function EditNote({ noteId, initialTitle, initialContent, onClose, onUpdate }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `https://task-manager-backend-eight-tau.vercel.app/notes/${noteId}`,
        {
          title,
          content,
        }
      );
      onUpdate(response.data); // Refresh note data after update
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Note</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Content"
          rows={5}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-1 px-3 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
