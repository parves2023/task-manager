Task Manager App 📝🚀
A full-stack MERN Task Manager App with drag-and-drop functionality, status management (Pending, To-Do, Done), and color-coded tasks.

Features
✅ User Authentication (Signup/Login)
✅ Create, Edit, Delete Tasks
✅ Drag and Drop between statuses
✅ Task Status: Pending, To-Do, Done
✅ Color-coded tasks for better visibility
✅ Responsive UI

Tech Stack 🛠️
Frontend
React.js (Vite)
React DnD (Drag and Drop)
Tailwind CSS (Styling)
Backend
Node.js & Express.js (REST API)
MongoDB & Mongoose (Database)
JWT Authentication
Installation & Setup ⚙️
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/task-manager.git
cd task-manager
2️⃣ Install Dependencies
Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
Backend
bash
Copy
Edit
cd server
npm install
node index.js
API Routes (Backend) 🌐
Method	Route	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	User login (JWT)
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create a new task
PATCH	/api/tasks/:id	Update a task (drag & drop status)
DELETE	/api/tasks/:id	Delete a task
Drag & Drop Implementation 🎯
Implemented using React DnD
Tasks can be moved between Pending, To-Do, and Done
Status updates in MongoDB
Color Coding 🎨
🟡 Pending → Yellow
🔵 To-Do → Blue
🟢 Done → Green
Future Improvements 🚀
✅ Dark Mode
✅ Task Due Dates & Reminders
✅ Collaboration (Team Tasks)

Contributing 🤝
Feel free to contribute! Open an issue or submit a pull request.

License 📜
MIT License

🔥 Developed with ❤️ by [Parves-Mosarof]
Let me know if you want me to tweak anything! 🚀