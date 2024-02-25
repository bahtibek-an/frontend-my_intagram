# Instagram Project

## Task

The goal of this project is to create a simplified Instagram-like web application using Laravel as the backend framework and Vite as the frontend build tool. The application should allow users to register, login, upload images, follow other users, and view a feed of images from users they follow.

## Description

This Instagram project is built using Laravel, a powerful PHP framework for building web applications, and Vite, a modern frontend build tool that enhances the development experience.

### Features

- **User Authentication:** Users can register and log in to the application securely.
  
- **Image Upload:** Users can upload images to share with their followers.

- **Follow System:** Users can follow and unfollow other users to see their posts in their feed.

- **Feed:** Users have a personalized feed displaying images from users they follow.

- **Profile:** Each user has their profile page displaying their uploaded images and followers.

## Installation
Follow these steps to set up and run the Instagram project on your local machine:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/instagram-project.git
    ```

2. **Navigate to the Project Directory:**
    ```bash
    cd instagram-project
    ```

3. **Install Dependencies:**
    ```bash
    composer install
    npm install
    ```

4. **Database Setup:**
    - Copy the `.env.example` file to create a `.env` file.
    - Configure the database connection in the `.env` file.
    - Run the database migrations and seeders:
        ```bash
        php artisan migrate --seed
        ```

5. **Build Frontend Assets:**
    ```bash
    npm run dev
    ```

6. **Start the Development Server:**
    ```bash
    php artisan serve
    ```

7. **Access the Application:**
    Open your web browser and go to `http://localhost:8000` to access the Instagram project.

## Usage

1. **Register or Login:**
    - Create a new account or log in using existing credentials.

2. **Upload Images:**
    - Navigate to the upload page to share your images.

3. **Follow Users:**
    - Explore other user profiles and follow them to see their posts in your feed.

4. **View Feed:**
    - Check your personalized feed to see images from users you follow.

5. **Profile Page:**
    - Visit your profile page to see your uploaded images and followers.

## Contributors

`Sirojiddin Kurganbaev`