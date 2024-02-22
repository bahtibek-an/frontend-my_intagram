# Instagram Clone


## Task
1. **User Authentication**: Implement user authentication to allow users to sign up, log in, and manage their profiles securely.

2. **Post Creation**: Enable users to create posts by uploading images along with captions and other relevant details.

3. **Emoji-based Commenting**: Implement a commenting system where users can add comments to posts, and support emoji-based reactions.

4. **Liking Posts**: Allow users to like posts and keep track of the number of likes for each post.

5. **Follow/Unfollow Functionality**: Implement the ability for users to follow and unfollow each other. Users should be able to see posts from users they follow in their feed.

6. **Search Bar**: Create a search bar that allows users to search for other users or posts based on usernames or content.

## Description
This project is an Instagram clone built using Laravel and Vite. It replicates some of the key features of Instagram, including user authentication, post creation, emoji-based commenting, liking posts, follow/unfollow functionality, and a search bar.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/instagram-clone.git
   cd instagram-clone
   ```

2. Install PHP dependencies using Composer:
   ```bash
   composer install
   ```

3. Install JavaScript dependencies using npm:
   ```bash
   npm install
   ```

4. Copy the example environment file and configure your database:
   ```bash
   cp .env.example .env
   ```

5. Generate an application key:
   ```bash
   php artisan key:generate
   ```

6. Migrate the database:
   ```bash
   php artisan migrate
   ```

7. Run the development server:
   ```bash
   php artisan serve
   ```

8. In a separate terminal, build the frontend assets:
   ```bash
   npm run dev
   ```

9. Access the application at `http://localhost:8000`.

## Usage
1. Create an account or log in with existing credentials.
2. Navigate to the "Create Post" section to share images and captions.
3. Explore the feed to see posts from users you follow.
4. Like and comment on posts using emojis.
5. Use the search bar to find users or posts based on keywords.
6. Follow and unfollow other users to customize your feed.
