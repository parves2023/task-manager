# Task Manager App 📝🚀

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) Task Manager App with drag-and-drop functionality, task status management (Pending, To-Do, Done), and color-coded tasks for better visibility.

---

## Features ✨

Live link: [Task Manager App](https://task-manager-online.netlify.app/)  
Client Repo: [GitHub - Client](https://github.com/parves2023/task-manager)  
Server Repo: [GitHub - Server](https://github.com/parves2023/task-manager-backend)

- **User Authentication**: Signup and Login with JWT-based authentication.
- **Task Management**:
  - Create, Edit, and Delete tasks.
  - Drag and Drop tasks between statuses.
- **Task Status**:
  - Pending
  - To-Do
  - Done
- **Color-Coded Tasks**:
  - 🟡 Pending → Yellow
  - 🔵 To-Do → Blue
  - 🟢 Done → Green
  - 🔴 Overdue → Red (for tasks past their due date)
- **Responsive UI**: Works seamlessly on both desktop and mobile devices.

---

## Tech Stack 🛠️

### Frontend
- **React.js** (Vite)
- **React DnD** (Drag and Drop functionality)
- **Tailwind CSS** (Styling)

### Backend
- **Node.js** & **Express.js** (REST API)
- **MongoDB** & **Mongoose** (Database)
- **JWT Authentication** (Secure user authentication)

---

## Installation & Setup ⚙️

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/parves2023/task-manager.git
cd task-manager
```

### 2️⃣ Install Dependencies

#### Frontend
```bash
cd client
npm install
npm run dev
```

#### Backend
```bash
cd server
npm install
node index.js
```

---

## API Routes (Backend) 🌐

| Method | Route                | Description                     |
|--------|----------------------|---------------------------------|
| POST   | `/api/auth/register` | Register a new user             |
| POST   | `/api/auth/login`    | User login (JWT)                |
| GET    | `/api/tasks`         | Get all tasks                   |
| POST   | `/api/tasks`         | Create a new task               |
| PATCH  | `/api/tasks/:id`     | Update a task (drag & drop status) |
| DELETE | `/api/tasks/:id`     | Delete a task                   |

---

## Drag & Drop Implementation 🎯

- Implemented using **React DnD**.
- Tasks can be moved between **Pending**, **To-Do**, and **Done**.
- Task status updates are saved in **MongoDB** in real-time.

---

## Color Coding 🎨

- 🟡 **Pending** → Yellow
- 🔵 **To-Do** → Blue
- 🟢 **Done** → Green
- 🔴 **Overdue** → Red (for tasks past their due date)

---

## Challenges Faced 🛑

1. **Drag and Drop Implementation**:  
   Initially, I struggled with implementing drag-and-drop functionality using **React DnD**. After several attempts and debugging, I managed to get it working by carefully following the documentation and examples.

2. **Color Coding for Overdue Tasks**:  
   I added a feature to mark tasks as **red** if they are past their due date. This required additional logic to compare the task's due date with the current date.

3. **No Dark Mode**:  
   Currently, the app does not support dark mode. This is a feature I plan to add in the future.

4. **Task Status Colors**:  
   Initially, I forgot to add color coding for **Pending** and **To-Do** tasks. After realizing this, I updated the UI to include yellow for Pending and blue for To-Do tasks.

---

## Future Improvements 🚀

- **Dark Mode**: Add a toggle for dark and light themes.
- **Task Due Dates & Reminders**: Set deadlines and receive reminders.
- **Collaboration**: Add team tasks and shared workspaces.
- **Task Categories**: Allow users to categorize tasks (e.g., Work, Personal, etc.).
- **Search & Filter**: Add search and filter options for tasks.

---

## Contributing 🤝

Contributions are welcome! If you'd like to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License 📜

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

🔥 **Developed with ❤️ by Parves Mosarof**

---

Let me know if you need further tweaks or additions! 🚀