📝 To-Do App

A simple and intuitive To-Do App built using React.js and Context API for state management and localStorage for persistent data storage. This application allows users to efficiently manage their daily tasks with features to view, add, edit, and delete tasks. Tasks are saved in the browser’s local storage, so they remain available even after refreshing the page.

🚀 Features

a. View Tasks: See all your tasks in a clean and organized list.
b. Add Tasks: Add new tasks with ease using the input field.
c. Edit Tasks: Modify task details when needed.
d. Delete Tasks: Remove completed or unnecessary tasks.
e. Persistent Storage: Tasks are stored in localStorage to ensure they are not lost on page reloads.
f. Context API for State Management: No props drilling; state is managed globally for better scalability.
g. Responsive Design: Works seamlessly on both desktop and mobile devices.

🛠️ Technologies Used

1. React.js
2. Context API for global state management
3. React Hooks (useState, useContext, useEffect)
4. localStorage for persistent storage
5. CSS for styling

⚙️ Installation

1. Clone the repository:

    git clone https://github.com/DasPooja/react-to-do-application.git

2. Navigate to the project directory:

    cd react-to-do-application

3. Install dependencies:

    npm install

4. Start the development server:

    npm start

5. Open http://localhost:3000 in your browser to view the app.

📂 Project Structure
/src  
  ├── components        # Reusable components (TaskList)  
  ├── context           # Context API setup (TaskContext.js)              #  
  └── App.js            # Main app component  

