import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import ImageUpload from "../ImgUpload"; // Import ImageUpload component

const AddNote = () => {
  const { user } = useContext(AuthContext); // Get user from Firebase AuthContext
  const [note, setNote] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const [preview, setPreview] = useState(""); // State for image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleImageUpload = (imageUrl) => {
    setNote((prev) => ({ ...prev, imageUrl })); // Set the image URL to the note state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include user details and timestamp
      const newNote = {
        ...note,
        userName: user?.displayName || "Anonymous", // Use displayName or fallback
        userEmail: user?.email || "No email provided", // Use email or fallback
        createdAt: new Date().toISOString(), // Save timestamp
      };

      await axios.post("http://localhost:5000/addnote", newNote);
      alert("Note added successfully!");
      setNote({ title: "", content: "", imageUrl: "" }); // Clear the form
      setPreview(""); // Clear the preview
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Add Note
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter note title"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={note.content}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter note content"
          ></textarea>
        </div>
        <ImageUpload
          onImageUpload={handleImageUpload}
          preview={preview}
          setPreview={setPreview}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
