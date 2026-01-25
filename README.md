# TaskTrack 📝

TaskTrack is a task management web application built using Node.js, Express, MongoDB, and EJS.  
It allows users to create, view, update, and delete tasks with priority, status, and due dates.

🔗 Live App: https://tasktrack-rv2q.onrender.com/tasks  
📦 GitHub Repo: https://github.com/MaheshKuleppanavar/tasktrack

---

## Features

- Add tasks with title, description, due date, priority, and status
- View tasks grouped by Pending and Completed
- Mark tasks as completed
- Delete tasks
- Flash messages for success and errors
- Server-side validation using Joi
- MongoDB Atlas database
- Deployed on Render

---

## Tech Stack

Frontend:
- EJS
- HTML, CSS
- Bootstrap

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

Other:
- Joi (validation)
- express-session
- connect-flash
- method-override
- dotenv
- Git & GitHub
- Render (deployment)

---
## Project Structure
tasktrack/
models/ → task.js  
views/ → tasks/, layouts/  
public/ → css/  
utils/ → ExpressError.js, wrapAsync.js  
Schema.js  
app.js  
package.json  
README.md

---

## Environment Variables

Create a `.env` file in the root directory:

MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
NODE_ENV=development

Do not commit the `.env` file to GitHub.

---

## Run Locally

1. Clone the repository:
```bash
git clone https://github.com/MaheshKuleppanavar/tasktrack.git

2. Go to the project folder:
cd tasktrack

3. Install dependencies:
npm install

4.Start the server:
npm run dev

5.Open in browser
http://localhost:3000/tasks

Deployment

Deployed on Render

MongoDB Atlas used as database

Environment variables configured on Render

Auto-deploy enabled from GitHub

Future Enhancements

User authentication (login/signup)

Edit task details

Search and filter tasks

Pagination

Improved UI/UX

Author

Mahesh Kudleppanavar
BCA Graduate | Web Developer

GitHub: https://github.com/MaheshKuleppanavar

⭐ If you like this project, give it a star on GitHub!


