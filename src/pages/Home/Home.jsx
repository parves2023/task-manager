import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import ImageUpload from "../../components/ImgUpload"; // Assuming ImageUpload is a separate component
import { motion } from "framer-motion";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const Home = () => {
  const { user } = useContext(AuthContext);

  // New Post State
  const [newPostImage, setNewPostImage] = useState("");
  const [newPostText, setNewPostText] = useState("");
  const [postSubmitting, setPostSubmitting] = useState(false); // Corrected state name
  const [postStatus, setPostStatus] = useState(""); // Added to track post submission status

  // All Posts State
  const [posts, setPosts] = useState([]);
  const [dataFetching, setDataFetching] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const axiosSecure = useAxiosSecure();

  const postsPerPage = 6;

  // Fetch posts for the current page
  const fetchPosts = async (page) => {
    setDataFetching(true);
    try {
      const { data } = await axiosSecure.get(
        `/posts?page=${page}&limit=${postsPerPage}`
      );
      setPosts(data.posts || []); // Handle missing or malformed data
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setDataFetching(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle post submission
  const handlePostSubmit = async () => {
    if (!newPostText && !newPostImage) {
      setPostStatus("Please provide either text or an image for your post.");
      return;
    }

    setPostSubmitting(true);
    setPostStatus(""); // Clear any previous status

    try {
      const postData = {
        text: newPostText.trim() || "", // Avoid empty string input issues
        image: newPostImage.trim() || "",
        author: user?.uid,
        authorName: user?.displayName || "Anonymous",
        authorImg: user?.photoURL,
        date: new Date().toISOString(),
      };

      // Submit post to the backend
      const submitResponse = await axios.post(
        "http://localhost:5000/posts",
        postData
      );

      if (submitResponse.data.success) {
        // Reset form fields and show success message
        setNewPostText("");
        setNewPostImage("");
        setPostStatus("Post submitted successfully!");

        // Fetch updated posts for the current page
        const fetchResponse = await axiosSecure.get(
          `/posts?page=${currentPage}&limit=${postsPerPage}`
        );
        setPosts(fetchResponse.data.posts || []);
        setTotalPages(fetchResponse.data.totalPages || 1);
      } else {
        setPostStatus("Failed to submit post.");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      setPostStatus("Failed to submit post. Please try again later.");
    } finally {
      setPostSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      {/* Dark Mode Toggle */}

      {/* Add New Post Section */}
      {/* Create Post Section */}
      {user && (
        <div className="container mx-auto mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="flex items-start space-x-4">
            {/* User Avatar */}
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="flex-1">
              {/* Image Upload Preview */}
              {newPostImage && (
                <div className="mb-4 relative">
                  <img
                    src={newPostImage}
                    alt="Preview"
                    className="rounded-lg object-cover w-full max-h-64"
                  />
                  <button
                    className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-red-600"
                    onClick={() => setNewPostImage("")}
                  >
                    ✕
                  </button>
                </div>
              )}

              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder={`What's on your mind, ${user?.displayName}?`}
                className="w-full bg-gray-100 text-gray-900 p-3 border rounded-lg focus:ring focus:outline-none dark:bg-gray-700 dark:text-white"
                rows="2"
              />

              <div className="flex justify-between">
                <div className="  size-24 overflow-hidden">
                  {/* Image Upload Button */}
                  <ImageUpload
                    onImageUpload={(url) => setNewPostImage(url)}
                    setPreview={setNewPostImage}
                  />
                </div>
                {/* Post Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePostSubmit}
                  className={`bg-green-600 font-semibold text-white p-2 px-6 mx-2 my-4 rounded-full w-full ${
                    postSubmitting ? "opacity-60" : "hover:bg-green-800"
                  }`}
                  disabled={postSubmitting}
                >
                  {postSubmitting ? "Submitting..." : "Post"}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Post Submission Status */}
          {postStatus && (
            <div
              className={`mt-4 text-center ${
                postStatus.includes("success")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <p>{postStatus}</p>
            </div>
          )}
        </div>
      )}

      {/* All Posts Section */}
      <div className="container mx-auto mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">All Posts</h2>

        {dataFetching ? (
          <div className="flex justify-center h-64 items-center">
            <p>Loading posts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Loop through the posts */}

            {posts?.map((post) => (
              <div
                key={post?._id}
                className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-md mb-6"
              >
                {/* Post Header */}
                <div className="flex items-center mb-4">
                  <img
                    src={post?.authorImg || "https://via.placeholder.com/150"}
                    alt="Author Avatar"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                      {post?.authorName || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(post?.date).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                {post?.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full max-h-96 object-cover rounded-lg mb-4"
                  />
                )}
                <p className="text-gray-900 dark:text-gray-100">{post?.text}</p>

                {/* Interaction Buttons */}
                <div className="mt-4 flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500"
                  >
                    <FaThumbsUp className="mr-2" /> Like
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500"
                  >
                    <FaComment className="mr-2" /> Comment
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 dark:bg-gray-700 text-gray-900 p-2 rounded-lg"
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 dark:bg-gray-700 text-gray-900 p-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
