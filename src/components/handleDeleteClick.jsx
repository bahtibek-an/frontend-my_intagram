// Import necessary functions and modules
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './your-firebase-config-file'; // Ensure you import your Firebase configuration

// Function to handle the deletion of a post
const handleDeleteClick = async () => {
    // Create a reference to the post document in the 'posts' collection using the post ID
    const postRef = doc(db, "posts", id);

    try {
        // Attempt to delete the post document
        await deleteDoc(postRef);
        // Log a success message to the console if deletion is successful
        console.log("Post deleted successfully!");
    } catch (error) {
        // Log an error message to the console if there's an error during deletion
        console.error("Error deleting post:", error);
    }
};
