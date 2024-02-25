import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, Firestoredb } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from 'firebase/firestore';
import { AuthContext } from '../Authentication';
import "./style.css";

export default function Upload() {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [imageFile, setImageFile] = useState(null);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    
    return (
        <>
            
        </>
    )
}
