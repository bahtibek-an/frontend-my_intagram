### Welcome to the My Instagram
**_Instagram_**

Welcome to the Instagram Clone project, a web application developed using the Laravel framework for the backend and Vite.js for the frontend. This project aims to replicate some of the core features of the popular social media platform, Instagram, including user authentication, post creation, liking, commenting with emojis, updating profiles, searching for users, and managing followers.

## Tasks

1. **User Authentication:**

    - Users can register an account with a unique username and email.
    - Existing users can log in securely.
    - Passwords are hashed and stored securely.

2. **Post Creation:**

    - Users can create new posts with images and captions.
    - Posts are displayed on the user's profile and the home feed.

3. **Post Interaction:**

    - Users can like posts, and the like count is updated in real-time.
    - Commenting on posts is allowed, including the use of emojis.

4. **Update Profile:**

    - Users can update their profile information, including a profile image.
    - Profile updates are reflected across the application.

5. **Search Users:**

    - Users can search for other users by entering their usernames.
    - The search is triggered by pressing 'Enter' after typing the username.

6. **Followers Section:**
    - Users can send following requests to other users.
    - If the request is accepted, the user becomes a follower of the requested user.
    - The followers' list is displayed on the user's profile.

## Description

This project demonstrates the implementation of key features found in Instagram, providing a hands-on example of using Laravel for backend development and Vite.js for frontend development. The combination of these technologies ensures a modern and efficient web application.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/instagram-clone.git
    ```

2. Navigate to the project directory:

    ```bash
    cd instagram-clone
    ```

3. Install backend dependencies:

    ```bash
    composer install
    ```

4. Create a copy of the `.env` file:

    ```bash
    cp .env.example .env
    ```

5. Configure your database in the `.env` file.

6. Run database migrations and seed the database:

    ```bash
    php artisan migrate --seed
    ```

7. Install frontend dependencies:
    ```bash
    npm install
    ```

## Usage

1. Build the frontend assets:

    ```bash
    npm run dev
    ```

2. Start the development server:

    ```bash
    php artisan serve
    ```

3. Access the application at `http://localhost:8000` in your browser.
4. Register a new account or log in with existing credentials.
5. Explore the various features, such as creating posts, liking, commenting, updating your profile, searching for users, and managing followers.

### The Core Team


<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>