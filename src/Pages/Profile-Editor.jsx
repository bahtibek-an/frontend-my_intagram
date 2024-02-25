import React, { useContext, useState } from "react";
import { getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Firestoredb } from "../firebase";
import { AuthContext } from "../Authentication";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Navbar from "../Component/Navbar";

export default function ProfileEditor() {
    const { currentUser } = useContext(AuthContext);
    const [email, setEmail] = useState(currentUser.email || "");
    const [newPassword, setNewPassword] = useState("");
    const [newDisplayName, setNewDisplayName] = useState(currentUser.displayName || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        setSaving(true);

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (email !== currentUser.email) {
                await updateEmail(user, email);
            }

            if (newPassword !== "") {
                const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newPassword);
            }

            if (selectedImage) {
                const storage = getStorage();
                const storageRef = ref(storage, `profileImages/${currentUser.uid}`);
                await uploadBytes(storageRef, selectedImage);
                const downloadURL = await getDownloadURL(storageRef);
                await updateProfile(user, { photoURL: downloadURL });
                const userDocRef = doc(Firestoredb, "Users", currentUser.uid);
                await updateDoc(userDocRef, { photoURL: downloadURL });
            }

            if (newDisplayName !== currentUser.displayName) {
                await updateProfile(user, { displayName: newDisplayName });
                const userDocRef = doc(Firestoredb, "Users", currentUser.uid);
                await updateDoc(userDocRef, { displayName: newDisplayName, email: email });
            }

            navigate(`/${currentUser.uid}`);
        } catch (error) {
            console.error("Error updating profile:", error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    return (
        <div className="container">
            <Navbar />
            <br />
            <br />
            <div className="edit-profile">
                <div className="profile-form">
                    <div className="form-header">
                        <h1 className="form-title">Edit Profile</h1>
                        <button onClick={handleUpdateProfile} className="save-button">
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                    <div className="profile-picture">
                        <img
                            src={selectedImage ? URL.createObjectURL(selectedImage) : currentUser.photoURL}
                            alt={`${currentUser.displayName} avatar`}
                            className="avatar"
                        />
                        <div className="change-avatar">
                            <label htmlFor="avatar" className="avatar-label">
                                Change Profile Photo
                            </label>
                            <input
                                type="file"
                                id="avatar"
                                onChange={handleFileChange}
                                className="avatar-input"
                            />
                        </div>
                    </div>
                    <div className="profile-info">
                        <label htmlFor="username" className="label">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="input"
                            value={newDisplayName}
                            onChange={(e) => setNewDisplayName(e.target.value)}
                        />
                    </div>
                    <div className="profile-info">
                        <label htmlFor="email" className="label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="profile-info">
                        <label htmlFor="currentPassword" className="label">
                            Old password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            className="input"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="profile-info">
                        <label htmlFor="newPassword" className="label">
                            New password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            className="input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
