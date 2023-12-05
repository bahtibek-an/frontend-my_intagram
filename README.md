# Welcome to My Instagram
***

## Task
This section should briefly explain what the problem or challenge is that your project aims 
to address. It could be something like, "My Instagram is a project aimed at creating a social 
media platform for sharing photos and connecting with friends."

## Description
Here, you can provide an overview of how you have solved the problem or implemented 
the project. Describe the key features and functionalities. For example, 
"My Instagram includes user registration, photo sharing, commenting, and a like button."

## Installation
Follow these steps to set up My Instagram on your local machine:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-instagram.git
   ```

2. Navigate to the project directory:
   ```bash
   cd my-instagram
   ```

3. Install Composer dependencies:
   ```bash
   composer install
   ```

4. Create a copy of the environment file:
   ```bash
   cp .env.example .env
   ```

5. Generate an application key:
   ```bash
   php artisan key:generate
   ```

6. Configure the database settings in the `.env` file. Provide your database credentials:

   ```plaintext
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

7. Migrate the database:
   ```bash
   php artisan migrate
   ```

8. Run the development server:
   ```bash
   php artisan serve
   ```

The application should now be running at `http://localhost:8000`. You can access it in your web browser.

## Usage
My Instagram provides a user-friendly interface for sharing photos and connecting with others. Key features include:

- User registration and authentication
- Posting photos with captions
- Commenting on posts
- Liking posts
- Viewing user profiles
- Following other users

To use the application:

1. Register for an account or log in if you already have one.
2. Create posts by clicking the "Create Post" button.
3. Explore the timeline to see posts from users you follow.
4. Visit user profiles to see their posts and follow/unfollow them.

## Features

- User Authentication
- Post Creation
- Commenting on Posts
- Liking Posts
- User Profile Pages
- Following and Followers



### The Core Team
Abdullox Abduqodirov  -`abduqo_abd`

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>
