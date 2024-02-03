# Frontend My Instagram

## Task
Create a simple Instagram clone using ReactJS for the frontend and Firebase for the backend. The project should include the following features:

- User authentication (Sign up, login, logout)
- Post creation, including images and captions
- User profile updates
- Follow/unfollow functionality
- Search for users
- Like and comment on posts, including emoji support

## Description

This Instagram project aims to replicate the core functionalities of the popular social media platform. Users will be able to sign up, log in, and customize their profiles. They can create posts by uploading images and adding captions. Users can follow and unfollow other users, search for specific users, and interact with posts by liking and commenting, including support for emojis.

The project utilizes ReactJS for the frontend, providing a responsive and dynamic user interface. Firebase serves as the backend, offering authentication, real-time database, and storage services. This combination ensures a scalable and efficient solution for building a social media platform.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/instagram-react-firebase.git
   ```

2. Navigate to the project directory:
   ```bash
   cd instagram-react-firebase
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a Firebase project:
   - Visit [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add Project" and follow the setup instructions.

5. Configure Firebase:
   - Copy your Firebase project configuration from the Firebase Console.
   - Create a file named `.env` in the project root and add your Firebase configuration:
     ```env
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```

6. Enable authentication providers in the Firebase Console:
   - Go to Authentication > Sign-in method.
   - Enable Email/Password and any other authentication methods you want to support.

7. Run the application:
   ```bash
   npm start
   ```

8. Open your browser and visit `http://localhost:3000` to view the Instagram clone.

## Usage

1. Sign Up:
   - Create a new account using a valid email and password.

2. Log In:
   - Log in with your email and password.

3. Profile:
   - Update your profile information, including username and profile picture.

4. Post:
   - Create a new post by uploading an image and adding a caption.

5. Follow/Unfollow:
   - Follow other users to see their posts on your feed.
   - Unfollow users to stop seeing their posts on your feed.

6. Search:
   - Use the search functionality to find and explore other users.

7. Like and Comment:
   - Interact with posts by liking and commenting, including support for emojis.

8. Log Out:
   - Log out of your account to secure your session.

Feel free to explore and enjoy the Instagram-like experience on this ReactJS and Firebase-powered project!
