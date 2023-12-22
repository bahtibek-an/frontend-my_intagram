const handleDeleteClick = async () => {
    const postRef = doc(db, "posts", id);

    try {
        await deleteDoc(postRef);
        // Optionally, you can also update the user's likedPosts array in Firestore if needed.
    } catch (error) {
        console.error("Error deleting post:", error);
    }
};
