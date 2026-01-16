# TaskTrack 📝

TaskTrack is a **secure, full-stack task management web application** built using **Node.js, Express, MongoDB, Passport.js, and EJS**.
It allows users to **register, log in, and manage their own tasks** with proper authentication, authorization, validation, and optimized database queries.

🔗 **Live Demo:**
[https://tasktrack-rv2q.onrender.com/tasks](https://tasktrack-rv2q.onrender.com/tasks)

📂 **GitHub Repository:**
[https://github.com/MaheshKuleppanavar/tasktrack](https://github.com/MaheshKuleppanavar/tasktrack)

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Signup & Login using **Passport.js (Local Strategy)**
* Secure session-based authentication
* Users can **only access and modify their own tasks**
* Protected routes using `isLoggedIn` middleware

### 📝 Task Management

* Create tasks with:

  * Title
  * Description
  * Due Date
  * Priority (Low / Medium / High)
  * Status (Pending / Completed)
* View tasks separated by **Pending** and **Completed**
* Update task status (complete / incomplete)
* Delete tasks securely (owner-only)

### ⚡ Performance & Security

* MongoDB **indexes for faster queries**
* Server-side validation using **Joi**
* Secure session cookies
* Flash messages for feedback
* Centralized error handling with custom `ExpressError`
* Authorization enforced at DB query level

### 🌐 Deployment

* MongoDB Atlas
* Deployed on **Render**
* Environment-based configuration

---

## 🛠️ Tech Stack

### Frontend

* EJS (Embedded JavaScript Templates)
* HTML5, CSS3
* Bootstrap 5

### Backend

* Node.js
* Express.js
* MongoDB & Mongoose
* Passport.js (passport-local, passport-local-mongoose)
* Express Sessions
* Connect Flash

### Utilities & Tools

* Joi (Validation)
* Method Override
* dotenv
* Git & GitHub
* Render (Deployment)

---

## 📂 Project Structure

```
tasktrack/
│
├── initDB/
│   ├── data.js
│   └── init.js
├── models/
│   ├── user.js
│   └── task.js
├── routes/
│   ├── user.js
│   └── task.js
├── views/
│   ├── layouts/
│   ├── includes/
│   ├── tasks/
│   └── user/
├── public/
│   └── css/
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── middlewrae.js
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
NODE_ENV=development
```

⚠️ **Never commit `.env` to GitHub**

---

## ▶️ Run Locally

1️⃣ Clone the repository

```bash
git clone https://github.com/MaheshKuleppanavar/tasktrack.git
cd tasktrack
```

2️⃣ Install dependencies

```bash
npm install
```

3️⃣ Start the server

```bash
npm start
```

4️⃣ Open in browser

```
http://localhost:3000
```

---

## 🔮 Future Improvements

* Edit task details
* Pagination for large task lists
* Search & filter tasks
* Email reminders
* REST API version

---

## 👨‍💻 Author

**Mahesh Kudleppanavar**
Frontend / Web Developer
GitHub: [https://github.com/MaheshKuleppanavar](https://github.com/MaheshKuleppanavar)

---
