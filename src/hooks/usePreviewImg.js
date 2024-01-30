import { useState } from 'react'
import useShowToast from './useShowToast';

const usePreviewImg = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const showToast = useShowToast();
    const maxFileSizeInBytes = 2*1024*1024;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            if (file.size > maxFileSizeInBytes) {
                showToast("Error", "File size must be less than 2MB", "error");
                setSelectedFile(null);
                return;
            }
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedFile(reader.result);
            }
            reader.readAsDataURL(file);
        } else {
            showToast("Error", "Only Image files allowed", "error");
            setSelectedFile(null);
        }
    }
    return { selectedFile, setSelectedFile, handleImageChange }
}

export default usePreviewImg