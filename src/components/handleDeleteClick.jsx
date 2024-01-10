const handleDeleteClick = async () => {
    const postRef = doc(db, "posts", id);

    try {
        await deleteDoc(postRef);
    } catch (error) {
        console.error("Error deleting post:", error);
    }
};
