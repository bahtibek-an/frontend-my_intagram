# Instagram Clone

## Task
The objective of this project is to develop a simplified clone of Instagram using Laravel for the backend and Vite.js for the frontend. The key features to implement include creating posts, liking and commenting on posts, following/unfollowing users, searching for users, and editing user profiles. By completing these tasks, you'll gain practical experience in building a social media platform and working with Laravel and Vite.js.

## Description
1. **Create Post:**
   - Users should be able to create and share posts, including images and captions.
    ***After choosing image, wait a few seconds, need to view 'borar archivo' or 'image selected' and after that write caption and description***

2. **Like and Comment:***
   - Users can like and comment on posts made by others. ***Click two times for emoji list opening**
   - For deleting your own posts click button ***"...", opened modal with delete button for post***

3. **Follow/Unfollow:**
   - Users have the ability to follow or unfollow other users, creating a social network aspect.

4. **Search:**
   - Users can search for other users based on usernames.

5. **Edit Profile:**
   - Users can modify their profile information, including username, profile picture, and bio.


## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/instagram-clone.git
   cd instagram-clone
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd server
   composer install
   ```

3. **Configure Environment Variables:**
   - Copy the `.env.example` file to `.env` in the `server` directory.
   - Configure the database connection and other necessary variables in the `.env` file.

4. **Run Migrations and Seeders:**
   ```bash
   php artisan migrate --seed
   ```

5. **Install Frontend Dependencies:**
   ```bash
   cd client
   npm install
   ```

6. **Environment Variables:**
   - Create a `.env` file in the `client` directory and configure the API endpoint.


## Usage
For run server:
```
php artisan serve and npm run dev
```

1. **Sign Up / Sign In:**
   - Create an account or log in using existing credentials.

2. **Create a Post:**
   - Share images and captions with the community.

3. **Like and Comment:**
   - Interact with posts by liking and commenting.

4. **Follow/Unfollow:**
   - Connect with other users by following or unfollowing them.

5. **Search:**
   - Find other users based on their usernames.

6. **Edit Profile:**
   - Modify your profile information and customize your account.

### The Core Team


<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>
