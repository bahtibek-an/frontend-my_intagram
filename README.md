# Instagram Clone

## Task
Develop a simplified Instagram clone using ReactJS to replicate the core functionality of the popular social media platform. The primary goal is to create a responsive and visually appealing user interface that allows users to view, like, and comment on photos.

## Description
This Instagram clone project aims to provide a hands-on experience with ReactJS, focusing on building a modern and interactive user interface. The project includes features such as:

- User authentication: Allow users to sign up, log in, and log out.
- Posts: Display a Posts of photos uploaded by users, including captions and user information.
- Likes: Users can like and unlike photos.
- Comments: Users can add and delete comments on photos.
- Profile: Users can view and update their profile information.

The project is structured to encourage modular and reusable React components, following best practices for code organization and readability. It also incorporates state management and routing to create a seamless user experience.

## Installation
Follow these steps to set up the Instagram clone project on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/instagram-clone.git
   cd instagram-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a new project on [Firebase](https://console.firebase.google.com/).
   - Obtain your Firebase configuration (API key, authDomain, projectId, etc.).
   - Create a `.env` file in the project root and add your Firebase configuration:
     ```
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to view the Instagram clone.

## Usage
Once the project is set up, you can explore and interact with the Instagram clone. Here are some key actions to try:

- **Sign Up/Log In:** Create a new account or log in with existing credentials.
- **View Feed:** Explore the feed to see photos uploaded by other users.
- **Like and Comment:** Interact with photos by liking and adding comments.
- **Update Profile:** Visit your profile page to update your user information.