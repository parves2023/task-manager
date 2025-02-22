import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2"; // Import SweetAlert2
import useAxiosSecure from "../../hooks/useAxiosSecure";
import EditNote from "./EditNote";

function Allnotes() {
  const { user } = useContext(AuthContext); // Get current user
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // State for the search bar
  const axiosSecure = useAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);

  const handleEditClick = (note) => {
    setSelectedNote(note); // Store the note that was clicked
    setIsEditing(true);
  };

  const categorizeNotes = (notes) => {
    const todoNotes = notes.filter((note) => note.category === "todo");
    const progressNotes = notes.filter((note) => note.category === "progress");
    const doneNotes = notes.filter((note) => note.category === "done");

    setTodo(todoNotes);
    setProgress(progressNotes);
    setDone(doneNotes);
  };

  const handleClose = () => {
    setIsEditing(false);
    setSelectedNote(null);
  };

  const handleUpdate = (updatedNote) => {
    console.log("Note Updated:", updatedNote);
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: `Note updated successfully`,
    });

    const fetchNotes = async () => {
      try {
        const { data } = await axiosSecure.get(`/notes?email=${user?.email}`);
        if (data.length > 0) {
          setNotes(data); // Set all notes
          categorizeNotes(data); // Categorize notes after fetching
        } else {
          setNotes([]); // Handle case where no notes are returned
          categorizeNotes([]); // Categorize empty notes
        }
      } catch (error) {
        console.error("Error fetching notes:", error.response || error.message);
      } finally {
        setLoading(false); // Ensure loading is set to false even in case of an error
      }
    };
    fetchNotes();
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true); // Set loading to true at the start of the request
      try {
        const { data } = await axiosSecure.get(`/notes?email=${user?.email}`);
        if (data.length > 0) {
          setNotes(data); // Set all notes
          categorizeNotes(data); // Categorize notes after fetching
        } else {
          setNotes([]); // Handle case where no notes are returned
          categorizeNotes([]); // Categorize empty notes
        }
      } catch (error) {
        console.error("Error fetching notes:", error.response || error.message);
      } finally {
        setLoading(false); // Ensure loading is set to false even in case of an error
      }
    };

    if (user?.email) {
      fetchNotes(); // Fetch notes only if user email is available
    }
  }, [user?.email]);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(value) ||
        note.content.toLowerCase().includes(value)
    );
    categorizeNotes(filtered); // Categorize filtered notes
  };


  const handleCategorySelect = async (id, selectedCategory) => {
    // Show a confirmation dialog using SweetAlert
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change the category to ${selectedCategory}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'No, cancel!',
    });
  
    // If the user confirms, perform the action
    if (result.isConfirmed) {
      // Perform the action (e.g., update the category in the state or API)
      console.log(`Category changed to ${selectedCategory} for item with ID ${id}`);
      // Add your logic here to handle the category change
    } else {
      // If the user cancels, do nothing
      console.log('Category change canceled');
    }
  };

  // Delete note handler
  const handleDelete = async (noteId, noteTitle) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `${noteTitle} will be deleted permanently`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/notes/${noteId}`
        );
        if (response.status === 200) {
          setNotes((prevNotes) =>
            prevNotes.filter((note) => note._id !== noteId)
          );
          categorizeNotes(notes.filter((note) => note._id !== noteId)); // Re-categorize after deletion
          Swal.fire("Deleted!", "Your note has been deleted.", "success");
        }
      } catch (error) {
        console.error("Error deleting note:", error);
        Swal.fire("Error!", "Something went wrong. Please try again.", "error");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">My Tasks</h2>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search Tasks by title or content..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {/* Notes Display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        {/* Todo Column */}
        <div className="border p-4 rounded-lg bg-gray-50">
          <h3 className="text-xl font-bold mb-4">Todo</h3>
          {todo.length > 0 ? (
            todo.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                handleDelete={handleDelete}
                handleEditClick={handleEditClick}
                isEditing={isEditing}
                selectedNote={selectedNote}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                handleCategorySelect={handleCategorySelect}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks in Todo.</p>
          )}
        </div>
        {/* Progress Column */}
        <div className="border p-4 rounded-lg bg-gray-50">
          <h3 className="text-xl font-bold mb-4">Progress</h3>
          {progress.length > 0 ? (
            progress.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                handleDelete={handleDelete}
                handleEditClick={handleEditClick}
                isEditing={isEditing}
                selectedNote={selectedNote}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                handleCategorySelect={handleCategorySelect}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks in Progress.</p>
          )}
        </div>
        {/* Done Column */}
        <div className="border p-4 rounded-lg bg-gray-50">
          <h3 className="text-xl font-bold mb-4">Done</h3>
          {done.length > 0 ? (
            done.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                handleDelete={handleDelete}
                handleEditClick={handleEditClick}
                isEditing={isEditing}
                selectedNote={selectedNote}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                handleCategorySelect={handleCategorySelect}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks in Done.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable NoteCard Component
// Reusable NoteCard Component
const NoteCard = ({
  note,
  handleDelete,
  handleEditClick,
  isEditing,
  selectedNote,
  handleClose,
  handleUpdate,
  handleCategorySelect, // Ensure this is passed as a prop
}) => {
  const outlineDate = note.outline ? new Date(note.outline) : null;
  const isPastOutline = outlineDate && outlineDate < new Date();

  return (
    <div
      className={`border border-gray-300 rounded-md shadow-md p-4 flex flex-col my-3 ${
        isPastOutline ? "bg-red-100" : "bg-white"
      }`}
    >
      {note.imageUrl && (
        <div className="mb-4 w-full">
          <img
            src={note.imageUrl}
            alt={note.title}
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
      <p className="text-gray-700 mb-4 flex-grow whitespace-pre-line">
        {note.content}
      </p>
      <small className="text-sm text-gray-500">
        <div>
          <strong>Category:</strong>
          <select
            name="category"
            id="asdf"
            className="border p-2 ml-2"
            value={note.category} // Set the default value to note.category
            onChange={(e) => {
              const selectedCategory = e.target.value;
              handleCategorySelect(note._id, selectedCategory); // Pass note._id instead of category._id
            }}
          >
            <option value="todo" disabled={note.category === "todo"}>
              Todo
            </option>
            <option value="progress" disabled={note.category === "progress"}>
              Progress
            </option>
            <option value="done" disabled={note.category === "done"}>
              Done
            </option>
          </select>
        </div>
        <br />
        <strong>Outline:</strong>{" "}
        {outlineDate ? outlineDate.toLocaleDateString("en-GB") : "Not Available"}{" "}
        <br />
        <strong>Created At:</strong>{" "}
        {new Date(note.createdAt).toLocaleString()}
      </small>
      {/* Delete and Edit Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleDelete(note._id, note.title)}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => handleEditClick(note)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
      </div>
      {/* Edit Note Modal */}
      {isEditing && selectedNote && selectedNote._id === note._id && (
        <EditNote
          noteId={selectedNote._id}
          initialTitle={selectedNote.title}
          initialContent={selectedNote.content}
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};


export default Allnotes;