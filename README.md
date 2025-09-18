Of course\! Here is the modified `README.md` with the requested "Application Preview" section for your screenshots.

# ✨ Konoha-Connect: A Full Stack Real-Time Chat App ✨

Welcome to **Konoha-Connect**, a feature-rich, real-time chat application built with a modern technology stack. This project demonstrates a complete full-stack implementation, from user authentication and real-time messaging to cloud-based media handling, all wrapped in a Naruto-themed UI.

-----

## 🌟 Features

  - **User Authentication**: Secure user registration and login system using JWT (JSON Web Tokens) with password hashing.
  - **Real-Time Messaging**: Instantaneous message delivery and updates powered by **Socket.IO**.
  - **Media Messaging**: Send and receive images, voice messages, and emojis.
  - **Profile Customization**: Users can update their profile pictures, which are hosted on Cloudinary.
  - **Online Status**: See which users are currently online in real-time.
  - **Global State Management**: Efficient and centralized state management on the frontend using **Zustand**.
  - **Responsive UI**: A beautiful, responsive user interface built with **Tailwind CSS** and **daisyUI**, featuring a custom "Konoha" theme.
  - **Robust Error Handling**: Comprehensive error handling on both the server and client to ensure a smooth user experience.

-----

## 📸 Application Preview

Here’s a glimpse of Konoha-Connect in action. *Replace the placeholder paths with the actual paths to your screenshots.*

| Login Page | Chat Interface |
| <img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/8589267f-9ae1-4c24-b78b-358e40adda92" />
 |<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/d874af43-1f34-4e8f-a45d-bcb54373ec35" />
 |
|  |  |

-----

## 🛠️ Tech Stack

  - **Frontend**: React.js, Vite, Tailwind CSS, daisyUI, Zustand
  - **Backend**: Node.js, Express.js
  - **Database**: MongoDB (with Mongoose)
  - **Real-Time Communication**: Socket.IO
  - **Authentication**: JWT, bcryptjs
  - **File Storage**: Cloudinary (for images and voice messages)

-----

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

  - [Node.js](https://nodejs.org/) (v18 or later recommended)
  - [npm](https://www.npmjs.com/) (comes with Node.js)
  - A [MongoDB](https://www.mongodb.com/) account (to get your database connection URI)
  - A [Cloudinary](https://cloudinary.com/) account (to get your cloud name and API keys)

### Installation & Setup

1.  **Clone the repository:**

    ```shell
    git clone https://github.com/your-username/fullstack-chat-app.git
    cd fullstack-chat-app
    ```

2.  **Install Backend Dependencies:**

    ```shell
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**

    ```shell
    cd ../frontend
    npm install
    ```

4.  **Set up Environment Variables:**
    Create a `.env` file in the `backend` directory and add the following variables. Replace the placeholder values with your actual credentials.

    ```env
    # Your MongoDB connection string
    MONGODB_URI=mongodb+srv://...

    # Port for the backend server
    PORT=5000

    # A strong, secret key for signing JWTs
    JWT_SECRET=your_super_secret_key_here

    # Your Cloudinary credentials for media uploads
    CLOUDINARY_CLOUD_NAME=your-cloud-name
    CLOUDINARY_API_KEY=your-api-key
    CLOUDINARY_API_SECRET=your-api-secret

    # Set the environment to development
    NODE_ENV=development
    ```

-----

## 🏃 Running the Application

You need to run the backend and frontend servers in two separate terminals.

1.  **Start the Backend Server:**
    From the `backend` directory, run:

    ```shell
    npm run dev
    ```

    This will start the server on `http://localhost:5000` with Nodemon, which automatically restarts on file changes.

2.  **Start the Frontend Development Server:**
    From the `frontend` directory, run:

    ```shell
    npm run dev
    ```

    This will start the Vite development server, and you can access the application at `http://localhost:5173`.

-----

## 📦 Building for Production

When you are ready to deploy your application, you need to create an optimized build of the frontend.

1.  **Build the Frontend App:**
    From the `frontend` directory, run:

    ```shell
    npm run build
    ```

    This will create a `dist` folder containing the optimized and minified static files for your application.

2.  **Start the Production Server:**
    The backend is already configured to serve the frontend's static files when in production. From the `backend` directory, run:

    ```shell
    npm start
    ```

    This will start the Node.js server, and we can access the complete application at the server's address (e.g., `http://localhost:5000`).
