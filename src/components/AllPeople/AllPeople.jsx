import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import ChatModal from "./ChatModal"; // Assuming you create a ChatModal component
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllPeople = () => {
  const { user } = useContext(AuthContext); // Get logged-in user info from AuthContext
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatWith, setChatWith] = useState(null); // Track user to chat with
  const axiosSecure = useAxiosSecure();

// Fetch all users except the current user
useEffect(() => {
  if (user) {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosSecure.get(`/users?email=${user.email}`);
        if (data?.users) {
          setPeople(data.users);
        } else {
          console.error("Error fetching users:", data.error);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(); // Ensure fetchUsers is called within the effect
  }
}, [user]);


  // Function to handle the message button click
  const handleMessageClick = (person) => {
    setChatWith(person); // Set the user to start chatting with
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">All People</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left">Photo</th>
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.email} className="bg-white hover:bg-gray-50">
                <td className="border border-gray-300 p-2 text-center">
                  <img
                    src={person.photo || "https://via.placeholder.com/150"}
                    alt={person.name}
                    className="w-20 h-20 mx-auto rounded-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">{person.name}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => handleMessageClick(person)}
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                  >
                    Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chat Modal */}
      {chatWith && (
        <ChatModal
          chatWith={chatWith}
          closeChat={() => setChatWith(null)} // Close the chat modal
        />
      )}
    </div>
  );
};

export default AllPeople;
