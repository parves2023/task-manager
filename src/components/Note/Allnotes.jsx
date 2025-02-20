import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2"; // Import SweetAlert2
import useAxiosSecure from "../../hooks/useAxiosSecure";
import EditNote from "./EditNote";

function Allnotes() {
  const { user } = useContext(AuthContext); // Get current user
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // State for the search bar
  const axiosSecure = useAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleEditClick = (note) => {
    setSelectedNote(note);  // Store the note that was clicked
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
    setSelectedNote(null);
  };

  const handleUpdate = (updatedNote) => {
    // Here you can update the note in your state or refetch notes
    console.log("Note Updated:", updatedNote);
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: `Note updated successfully`,
    });


    const fetchNotes = async () => {
   // Set loading to true at the start of the request
      try {
        const { data } = await axiosSecure.get(`/notes?email=${user?.email}`);
        if (data.length > 0) {
          setNotes(data); // Set all notes
          setFilteredNotes(data); // Initially, all notes are shown
        } else {
          setNotes([]); // Handle case where no notes are returned
          setFilteredNotes([]); // Handle case where no notes are returned
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
          setFilteredNotes(data); // Initially, all notes are shown
        } else {
          setNotes([]); // Handle case where no notes are returned
          setFilteredNotes([]); // Handle case where no notes are returned
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
    setFilteredNotes(filtered);
  };

  // Delete note handler
  const handleDelete = async (noteId, noteTitle) => {
    // Confirm deletion with Swal
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `${noteTitle} will be deleted parmanently`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // Send request to delete the note
        const response = await axios.delete(
          `http://localhost:5000/notes/${noteId}`
        );
        if (response.status === 200) {
          // Update local state by filtering out the deleted note
          setNotes((prevNotes) =>
            prevNotes.filter((note) => note._id !== noteId)
          );
          setFilteredNotes((prevNotes) =>
            prevNotes.filter((note) => note._id !== noteId)
          );
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
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">My Notes</h2>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search notes by title or content..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {/* Notes Display */}
      {filteredNotes.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="border border-gray-300 rounded-md shadow-md p-4 bg-white"
            >
              {note.imageUrl && (
                <div className="mb-4">
                  <img
                    src={note.imageUrl}
                    alt={note.title}
                    className="w-full h-64 object-cover rounded-md"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-700 mb-4">{note.content}</p>
              <small className="text-sm text-gray-500">
                <strong>By:</strong> {note.userName} | <strong>Email:</strong>{" "}
                {note.userEmail}
                <br />
                <strong>Created At:</strong>{" "}
                {new Date(note.createdAt).toLocaleString()}
              </small>
              {/* Delete Button */}
             <div className="flex justify-between">
             <button
                onClick={() => handleDelete(note._id,note.title)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
        onClick={()=> handleEditClick(note)}
        className="mt-4 bg-blue-300 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Edit
      </button>
             
             </div>

             {isEditing && selectedNote && (
        <EditNote
          noteId={selectedNote._id}
          initialTitle={selectedNote.title}
          initialContent={selectedNote.content}
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      )}

            </div>
          ))}

          
        </div>
      ) : (
        <p className="text-center text-gray-500">No notes available.</p>
      )}
    </div>
  );
}

export default Allnotes;
