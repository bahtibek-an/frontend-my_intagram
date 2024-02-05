# Instagram Clone

## Task

Create a simplified Instagram clone using the Laravel PHP framework for the backend and Vite for the frontend. Implement core features of Instagram, such as user registration, photo uploads, likes, and comments.

## Description

This project aims to replicate basic functionalities of Instagram, allowing users to sign up, upload photos, like and comment on posts. The backend is built with Laravel, providing a robust and secure foundation, while the frontend uses Vite for a fast and efficient development experience.

## Installation

### Prerequisites

- PHP 7.4 or higher
- Composer
- Node.js
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/instagram-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd instagram-project
   ```

3. Install Laravel dependencies:

   ```bash
   composer install
   ```

4. Copy the `.env.example` file to `.env` and configure your database settings.

5. Generate the application key:

   ```bash
   php artisan key:generate
   ```

6. Run database migrations:

   ```bash
   php artisan migrate
   ```

7. Install frontend dependencies:

   ```bash
   npm install
   ```

8. Start the development server:

   ```bash
   npm run dev
   ```

9. Run the Laravel development server:

   ```bash
   php artisan serve
   ```

Your Instagram project should now be accessible at [http://localhost:8000](http://localhost:8000).

## Usage

1. Open your browser and go to [http://localhost:8000](http://localhost:8000).
2. Sign up for a new account.
3. Log in with your newly created account.
4. Upload photos, view posts, like, and comment on posts.

Explore the project and enjoy the simplified Instagram experience!